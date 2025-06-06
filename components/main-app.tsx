'use client';

import { useState } from 'react';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { TopBar } from '@/components/navigation/top-bar';
import { FeedView } from '@/components/feed/feed-view';
import { ChatView } from '@/components/chat/chat-view';
import { MarketplaceView } from '@/components/marketplace/marketplace-view';
import { WalletView } from '@/components/wallet/wallet-view';
import { ProfileView } from '@/components/profile/profile-view';

export type ActiveView = 'feed' | 'chat' | 'marketplace' | 'wallet' | 'profile';

export function MainApp() {
  const [activeView, setActiveView] = useState<ActiveView>('feed');

  const renderView = () => {
    switch (activeView) {
      case 'feed':
        return <FeedView />;
      case 'chat':
        return <ChatView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'wallet':
        return <WalletView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <FeedView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar activeView={activeView} />
      
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
      
      <BottomNavigation 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
    </div>
  );
}