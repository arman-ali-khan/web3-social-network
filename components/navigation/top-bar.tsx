'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActiveView } from '@/components/main-app';
import { useAuthStore } from '@/store/auth-store';
import { QRCodeDialog } from '@/components/qr/qr-code-dialog';
import { SearchPage } from '@/components/search/search-page';
import { 
  Bell, 
  Search, 
  Settings, 
  QrCode,
  Plus,
  X,
  User,
  Shield,
  Palette,
  HelpCircle,
  LogOut,
  MessageSquare,
  Heart,
  UserPlus,
  Gift,
  Camera
} from 'lucide-react';

interface TopBarProps {
  activeView: ActiveView;
  onViewChange?: (view: ActiveView) => void;
}

const viewTitles = {
  feed: 'Web3Social',
  chat: 'Messages',
  marketplace: 'Marketplace',
  wallet: 'Wallet',
  profile: 'Profile',
  stories: 'Stories',
};

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    title: 'New like on your post',
    message: 'crypto_artist liked your NFT showcase',
    timestamp: '2 min ago',
    read: false,
    icon: Heart,
  },
  {
    id: '2',
    type: 'follow',
    title: 'New follower',
    message: 'defi_trader started following you',
    timestamp: '1 hour ago',
    read: false,
    icon: UserPlus,
  },
  {
    id: '3',
    type: 'message',
    title: 'New message',
    message: 'You have a new message from nft_collector',
    timestamp: '3 hours ago',
    read: true,
    icon: MessageSquare,
  },
  {
    id: '4',
    type: 'reward',
    title: 'Reward earned',
    message: 'You earned 50 tokens for daily activity',
    timestamp: '1 day ago',
    read: true,
    icon: Gift,
  },
];

export function TopBar({ activeView, onViewChange }: TopBarProps) {
  const { user, logout } = useAuthStore();
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchPage(true);
      setSearchExpanded(false);
    }
  };

  const handleSearchToggle = () => {
    if (searchExpanded && searchQuery) {
      handleSearchSubmit(new Event('submit') as any);
    } else {
      setSearchExpanded(!searchExpanded);
      if (!searchExpanded) {
        // Focus the input when expanding
        setTimeout(() => {
          const input = document.getElementById('search-input');
          input?.focus();
        }, 100);
      }
    }
  };

  const closeSearchPage = () => {
    setShowSearchPage(false);
    setSearchQuery('');
  };

  // Show search page if it's open
  if (showSearchPage) {
    return <SearchPage initialQuery={searchQuery} onClose={closeSearchPage} />;
  }

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3 dark:bg-black/20 dark:backdrop-blur-xl dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {activeView === 'feed' && !searchExpanded && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center dark:bg-gray-700 dark:shadow-gray-700/30">
                  <span className="text-primary-foreground font-bold text-sm">W3</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">Web3Social</h1>
              </div>
            )}
            
            {(activeView !== 'feed' || searchExpanded) && (
              <div className="flex items-center space-x-3">
                {searchExpanded && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchExpanded(false);
                      setSearchQuery('');
                    }}
                    className="dark:hover:bg-gray-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {!searchExpanded && (
                  <h1 className="text-xl font-semibold">{viewTitles[activeView]}</h1>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="flex items-center">
              {searchExpanded ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                  <Input
                    id="search-input"
                    placeholder="Search posts, users, NFTs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 md:w-80 dark:bg-gray-900/30 dark:border-gray-700 dark:focus:border-gray-600"
                    autoFocus
                  />
                  <Button type="submit" size="sm" className="dark:bg-gray-700 dark:hover:bg-gray-600">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleSearchToggle} className="dark:hover:bg-gray-800">
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Stories shortcut */}
            {!searchExpanded && activeView !== 'stories' && onViewChange && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onViewChange('stories')}
                title="Stories"
                className="dark:hover:bg-gray-800"
              >
                <Camera className="h-5 w-5" />
              </Button>
            )}

            {/* QR Code */}
            {!searchExpanded && (
              <Button variant="ghost" size="sm" onClick={() => setQrDialogOpen(true)} className="dark:hover:bg-gray-800">
                <QrCode className="h-5 w-5" />
              </Button>
            )}
            
            {/* Add Post (Chat view only) */}
            {activeView === 'chat' && !searchExpanded && (
              <Button variant="ghost" size="sm" className="dark:hover:bg-gray-800">
                <Plus className="h-5 w-5" />
              </Button>
            )}
            
            {/* Notifications */}
            {!searchExpanded && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative dark:hover:bg-gray-800">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs dark:bg-red-500/90 dark:backdrop-blur-sm"
                      >
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 dark:bg-gray-900/90 dark:backdrop-blur-xl dark:border-gray-700">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadNotifications > 0 && (
                      <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                        {unreadNotifications} new
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <div className="max-h-96 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3 dark:hover:bg-gray-800">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.read ? 'bg-muted dark:bg-gray-700' : 'bg-primary/10 dark:bg-gray-600'
                        }`}>
                          <notification.icon className={`h-4 w-4 ${
                            notification.read ? 'text-muted-foreground' : 'text-primary dark:text-gray-300'
                          }`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              notification.read ? 'text-muted-foreground' : 'text-foreground'
                            }`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full dark:bg-gray-400" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem className="text-center text-sm text-primary dark:text-gray-300">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Settings */}
            {!searchExpanded && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="dark:hover:bg-gray-800">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900/90 dark:backdrop-blur-xl dark:border-gray-700">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem className="dark:hover:bg-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-gray-800">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Privacy & Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-gray-800">
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Appearance</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-gray-800">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem className="dark:hover:bg-gray-800">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive dark:hover:bg-red-500/20"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* User Avatar */}
            {!searchExpanded && (
              <Avatar className="h-8 w-8 ring-2 ring-transparent dark:ring-gray-700">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="dark:bg-gray-700 dark:text-gray-300">
                  {user?.displayName?.slice(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </header>

      <QRCodeDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} />
    </>
  );
}