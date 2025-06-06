'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ActiveView } from '@/components/main-app';
import { useAuthStore } from '@/store/auth-store';
import { 
  Bell, 
  Search, 
  Settings, 
  QrCode,
  Plus
} from 'lucide-react';

interface TopBarProps {
  activeView: ActiveView;
}

const viewTitles = {
  feed: 'Web3Social',
  chat: 'Messages',
  marketplace: 'Marketplace',
  wallet: 'Wallet',
  profile: 'Profile',
};

export function TopBar({ activeView }: TopBarProps) {
  const { user } = useAuthStore();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {activeView === 'feed' && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W3</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">Web3Social</h1>
            </div>
          )}
          
          {activeView !== 'feed' && (
            <h1 className="text-xl font-semibold">{viewTitles[activeView]}</h1>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {activeView === 'feed' && (
            <>
              <Button variant="ghost" size="sm" className="relative">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <QrCode className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {activeView === 'chat' && (
            <Button variant="ghost" size="sm">
              <Plus className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs"
            >
              2
            </Badge>
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {user?.displayName?.slice(0, 2).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}