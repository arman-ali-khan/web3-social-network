'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { LandingPage } from '@/components/landing/landing-page';
import { MainApp } from '@/components/main-app';
import { useAuthStore } from '@/store/auth-store';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { isConnected } = useAccount();
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading Web3Social...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !isConnected) {
    return <LandingPage />;
  }

  return <MainApp />;
}