import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = rsvpSchema.parse(body);

    // Check if event exists and is public
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { rsvps: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (!event.isPublic) {
      return NextResponse.json(
        { error: 'Event is not public' },
        { status: 403 }
      );
    }

    if (event.status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Event is not available for RSVP' },
        { status: 403 }
      );
    }

    // Check if event is full
    if (event.maxAttendees && event._count.rsvps >= event.maxAttendees) {
      return NextResponse.json(
        { error: 'Event is full' },
        { status: 403 }
      );
    }

    // Check if user already RSVPed
    const existingRsvp = await prisma.rSVP.findUnique({
      where: {
        eventId_email: {
          eventId: params.id,
          email: validatedData.email,
        },
      },
    });

    if (existingRsvp) {
      return NextResponse.json(
        { error: 'You have already RSVPed to this event' },
        { status: 409 }
      );
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        ...validatedData,
        eventId: params.id,
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error('Error creating RSVP:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create RSVP' },
      { status: 500 }
    );
  }
}