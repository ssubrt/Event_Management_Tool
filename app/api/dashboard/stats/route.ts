import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request);

    // Get stats based on user role
    let whereClause: any = {};
    
    if (session?.user.role === 'EVENT_OWNER') {
      whereClause = { creatorId: session.user.id };
    }
    // For ADMIN and STAFF, show all events

    const [
      totalEvents,
      publishedEvents,
      totalRsvps,
      recentEvents
    ] = await Promise.all([
      prisma.event.count({ where: whereClause }),
      prisma.event.count({ 
        where: { ...whereClause, status: 'PUBLISHED' } 
      }),
      prisma.rSVP.count({
        where: {
          event: whereClause.creatorId ? { creatorId: whereClause.creatorId } : {}
        }
      }),
      prisma.event.findMany({
        where: whereClause,
        include: {
          _count: {
            select: { rsvps: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    return NextResponse.json({
      totalEvents,
      publishedEvents,
      totalRsvps,
      recentEvents,
    });
  } catch (error : any) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}