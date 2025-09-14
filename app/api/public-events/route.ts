import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-server';
import { EventStatus } from '@prisma/client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
  try {

    await requireAuth(request);
    
    // Only get published and public events
    const where = {
      startDate: { gte: new Date() },
      isPublic: true,
      status: EventStatus.PUBLISHED,
    };
    
    
    const [events] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: { rsvps: true },
          },
        },
        orderBy: { startDate: 'asc' },

      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      events
    });
  } catch (error :any) {
    console.error('Error fetching public events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch public events' },
      { status: 500 }
    );
  }
}