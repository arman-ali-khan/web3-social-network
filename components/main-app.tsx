'use client';

import { useState } from 'react';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { FloatingBottomNav } from '@/components/navigation/floating-bottom-nav';
import { TopBar } from '@/components/navigation/top-bar';
import { FeedView } from '@/components/feed/feed-view';
import { ChatView } from '@/components/chat/chat-view';
import { MarketplaceView } from '@/components/marketplace/marketplace-view';
import { WalletView } from '@/components/wallet/wallet-view';
import { ProfileView } from '@/components/profile/profile-view';
import { StoryPage } from '@/components/stories/story-page';

export type ActiveView = 'feed' | 'chat' | 'marketplace' | 'wallet' | 'profile' | 'stories';

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
      case 'stories':
        return <StoryPage />;
      default:
        return <FeedView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
      
      {/* Mobile Bottom Navigation - Hidden on larger screens */}
      <div className="md:hidden">
        <BottomNavigation 
          activeView={activeView} 
          onViewChange={setActiveView} 
        />
      </div>
      
      {/* Floating Bottom Navigation - Visible on tablet and desktop */}
      <div className="hidden md:block">
        <FloatingBottomNav 
          activeView={activeView} 
          onViewChange={setActiveView} 
        />
      </div>
    </div>
  );
}