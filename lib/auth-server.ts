import { NextRequest } from 'next/server';
import { verifyToken } from './auth-utils';
import { prisma } from './prisma';

export async function requireAuth(request?: NextRequest) {
  let token: string | null = null;

  try {
    if (request) {
      // For API routes
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null; // No token provided
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
        } else {
          return null; // No token in headers
        }
      } catch (error :any){
        // Headers not available in this context
        return null; // Return null instead of throwing
      }
    }

    if (!token) {
      return null; // No token found
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null; // Invalid token
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
      return null; // User not found
    }

    return { user }; // Authentication successful
  } catch (error :any) {
    console.error("Authentication error:", error);
    return null; // Any unexpected error
  }
}