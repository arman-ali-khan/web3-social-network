'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ActiveView } from '@/components/main-app';
import { 
  Home, 
  MessageCircle, 
  ShoppingBag, 
  Wallet, 
  User,
  Camera,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingBottomNavProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const navItems = [
  { id: 'feed' as ActiveView, icon: Home, label: 'Feed' },
  { id: 'stories' as ActiveView, icon: Camera, label: 'Stories' },
  { id: 'marketplace' as ActiveView, icon: ShoppingBag, label: 'Shop' },
  { id: 'wallet' as ActiveView, icon: Wallet, label: 'Wallet' },
  { id: 'profile' as ActiveView, icon: User, label: 'Profile' },
];

export function FloatingBottomNav({ activeView, onViewChange }: FloatingBottomNavProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full floating-nav">
      <div className="bg-background/95 backdrop-blur-md border rounded-full shadow-lg px-3 py-2 dark:bg-blue-950/20 dark:backdrop-blur-xl dark:border-blue-500/20 dark:shadow-blue-500/10">
        <div className="flex items-center space-x-2">
          {navItems.map((item, index) => (
            <div key={item.id} className="relative">
              <Button
                variant={activeView === item.id ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  "h-10 w-10 rounded-full p-0 relative transition-all duration-300 nav-button",
                  activeView === item.id 
                    ? "bg-primary text-primary-foreground shadow-lg scale-110 dark:bg-blue-500 dark:shadow-blue-500/30 dark:shadow-lg nav-active" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground hover:scale-105 dark:hover:bg-blue-500/20 dark:hover:text-blue-300 dark:hover:shadow-blue-500/20"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="h-4 w-4" />
                <span className="sr-only">{item.label}</span>
              </Button>
            </div>
          ))}
          
          {/* Separator with blue accent */}
          <div className="w-px h-6 bg-border mx-2 dark:bg-blue-500/30" />
          
          {/* Chat button with notification */}
          <div className="relative">
            <Button
              variant={activeView === 'chat' ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                "h-10 w-10 rounded-full p-0 relative transition-all duration-300 nav-button",
                activeView === 'chat' 
                  ? "bg-primary text-primary-foreground shadow-lg scale-110 dark:bg-blue-500 dark:shadow-blue-500/30 dark:shadow-lg nav-active" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground hover:scale-105 dark:hover:bg-blue-500/20 dark:hover:text-blue-300 dark:hover:shadow-blue-500/20"
              )}
              onClick={() => onViewChange('chat')}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Chat</span>
            </Button>
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs dark:bg-red-500/90 dark:backdrop-blur-sm dark:border-red-400/30"
            >
              3
            </Badge>
          </div>
          
          {/* Create/Add button with enhanced styling */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-full p-0 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-105 dark:border-blue-500/30 dark:hover:border-blue-400/50 dark:hover:bg-blue-500/10 dark:hover:shadow-blue-500/20"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Create</span>
          </Button>
        </div>
      </div>
      
      {/* Active view indicator with blue glow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
        <div className="w-1 h-1 bg-primary rounded-full dark:bg-blue-400 dark:shadow-blue-400/50 dark:shadow-sm" />
      </div>
    </div>
  );
}