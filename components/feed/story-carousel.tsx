'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';

const mockStories = [
  {
    id: '1',
    author: {
      username: 'crypto_artist',
      displayName: 'Crypto Artist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    },
    thumbnail: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=300',
    viewed: false,
  },
  {
    id: '2',
    author: {
      username: 'defi_trader',
      displayName: 'DeFi Trader',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300',
    viewed: true,
  },
  {
    id: '3',
    author: {
      username: 'nft_collector',
      displayName: 'NFT Collector',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
    },
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300',
    viewed: false,
  },
];

export function StoryCarousel() {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 pb-4">
        {/* Add Story */}
        <div className="flex flex-col items-center space-y-2 flex-shrink-0">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-xs text-center max-w-[60px] truncate">
            Your Story
          </span>
        </div>

        {/* Stories */}
        {mockStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0">
            <div className="relative">
              <div className={`p-1 rounded-full ${
                story.viewed 
                  ? 'bg-muted' 
                  : 'bg-gradient-to-tr from-primary to-accent'
              }`}>
                <Avatar className="h-14 w-14">
                  <AvatarImage src={story.author.avatar} />
                  <AvatarFallback>
                    {story.author.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <span className="text-xs text-center max-w-[60px] truncate">
              {story.author.displayName}
            </span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}