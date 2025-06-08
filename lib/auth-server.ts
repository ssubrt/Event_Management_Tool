import { NextRequest } from 'next/server';
import { verifyToken } from './auth-utils';
import { prisma } from './prisma';

export async function requireAuth(request?: NextRequest) {
  let token: string | null = null;

  if (request) {
    // For API routes
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }
    token = authHeader.substring(7);
  } else {
    // For server components - try to get from headers
    try {
      const { headers } = await import('next/headers');
      const headersList = headers();
      const authHeader = headersList.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    } catch (error) {
      // Headers not available in this context
      throw new Error('Authentication required');
    }
  }

  if (!token) {
    throw new Error('No token provided');
  }

  const payload = verifyToken(token);
  if (!payload) {
    throw new Error('Invalid token');
  }

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return { user };
}