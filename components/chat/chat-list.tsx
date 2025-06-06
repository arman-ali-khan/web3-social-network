'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/store/chat-store';
import { formatDistanceToNow } from 'date-fns';

// Mock chats
const mockChats = [
  {
    id: '1',
    participants: ['user1', 'crypto_artist'],
    participant: {
      id: 'crypto_artist',
      username: 'crypto_artist',
      displayName: 'Crypto Artist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    },
    lastMessage: {
      id: 'msg1',
      content: 'Hey! Check out my latest NFT drop 🎨',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      senderId: 'crypto_artist',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    participants: ['user1', 'defi_trader'],
    participant: {
      id: 'defi_trader',
      username: 'defi_trader',
      displayName: 'DeFi Trader',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    lastMessage: {
      id: 'msg2',
      content: 'What do you think about the market?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      senderId: 'user1',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participants: ['user1', 'nft_collector'],
    participant: {
      id: 'nft_collector',
      username: 'nft_collector',
      displayName: 'NFT Collector',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
    },
    lastMessage: {
      id: 'msg3',
      content: 'Sent you 0.1 ETH ⚡',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      senderId: 'nft_collector',
    },
    unreadCount: 1,
  },
];

export function ChatList() {
  const { setActiveChat, activeChat } = useChatStore();

  return (
    <div className="w-full">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-2">
          {mockChats.map((chat) => (
            <Button
              key={chat.id}
              variant={activeChat === chat.id ? 'secondary' : 'ghost'}
              className="w-full p-4 h-auto justify-start"
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.participant.avatar} />
                    <AvatarFallback>
                      {chat.participant.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {chat.unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                    >
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">
                      {chat.participant.displayName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(chat.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage.content}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}