'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth-store';
import { 
  Settings, 
  Share, 
  MoreHorizontal,
  MapPin,
  Calendar,
  Link as LinkIcon
} from 'lucide-react';

export function ProfileHeader() {
  const { user } = useAuthStore();

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
      
      {/* Profile Content */}
      <div className="px-4 pb-4">
        <div className="relative -mt-16 mb-4">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-2xl">
              {user?.displayName?.slice(0, 2).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-4">
          {/* Name and Actions */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                {user?.verified && (
                  <Badge variant="secondary" className="h-5 w-5 p-0">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">@{user?.username}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Bio */}
          <div className="space-y-2">
            <p className="text-sm leading-relaxed">
              {user?.bio || 'Web3 enthusiast, NFT collector, and blockchain advocate. Building the future of decentralized social media. 🚀'}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Metaverse</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon className="h-4 w-4" />
                <span className="text-primary">web3social.app</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}