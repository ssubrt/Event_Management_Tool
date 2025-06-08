'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { initializeAuth } from '@/lib/store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
}