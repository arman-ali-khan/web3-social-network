'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ActiveView } from '@/components/main-app';
import { 
  Home, 
  MessageCircle, 
  ShoppingBag, 
  Wallet, 
  User 
} from 'lucide-react';

interface BottomNavigationProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const navItems = [
  { id: 'feed' as ActiveView, icon: Home, label: 'Feed' },
  { id: 'chat' as ActiveView, icon: MessageCircle, label: 'Chat', badge: 3 },
  { id: 'marketplace' as ActiveView, icon: ShoppingBag, label: 'Shop' },
  { id: 'wallet' as ActiveView, icon: Wallet, label: 'Wallet' },
  { id: 'profile' as ActiveView, icon: User, label: 'Profile' },
];

export function BottomNavigation({ activeView, onViewChange }: BottomNavigationProps) {
  return (
    <nav className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col gap-1 h-14 px-2 relative"
            onClick={() => onViewChange(item.id)}
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}