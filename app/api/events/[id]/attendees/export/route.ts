import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    // Define the expected user type
    type User = {
      id: string;
      role: string;
      [key: string]: any;
    };
    const user = session?.user as User;

    // Check if user owns the event or has admin/staff role
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        rsvps: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (event.creatorId !== user.id && 
        !['ADMIN', 'STAFF'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Generate CSV content
    const csvHeader = 'Name,Email,Phone,Message,Status,RSVP Date\n';
    const csvRows = event.rsvps.map(rsvp => {
      const name = `"${rsvp.name.replace(/"/g, '""')}"`;
      const email = `"${rsvp.email}"`;
      const phone = `"${rsvp.phone || ''}"`;
      const message = `"${(rsvp.message || '').replace(/"/g, '""')}"`;
      const status = `"${rsvp.status}"`;
      const date = `"${rsvp.createdAt.toISOString()}"`;
      
      return `${name},${email},${phone},${message},${status},${date}`;
    }).join('\n');

    const csvContent = csvHeader + csvRows;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="event-${event.id}-attendees.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting attendees:', error);
    return NextResponse.json(
      { error: 'Failed to export attendees' },
      { status: 500 }
    );
  }
}