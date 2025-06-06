'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useChatStore } from '@/store/chat-store';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Coins
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock messages
const mockMessages = [
  {
    id: '1',
    senderId: 'crypto_artist',
    content: 'Hey! Check out my latest NFT drop 🎨',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'text' as const,
  },
  {
    id: '2',
    senderId: 'user1',
    content: 'Wow, these look amazing! How much for the blue one?',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: 'text' as const,
  },
  {
    id: '3',
    senderId: 'crypto_artist',
    content: '0.5 ETH for that piece. It\'s part of my genesis collection!',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: 'text' as const,
  },
  {
    id: '4',
    senderId: 'user1',
    content: 'Deal! Sending payment now...',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'text' as const,
  },
  {
    id: '5',
    senderId: 'user1',
    content: 'Sent 0.5 ETH',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: 'crypto' as const,
    amount: '0.5',
    currency: 'ETH',
  },
];

const mockParticipant = {
  id: 'crypto_artist',
  username: 'crypto_artist',
  displayName: 'Crypto Artist',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  verified: true,
};

export function ChatWindow() {
  const { setActiveChat } = useChatStore();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Handle message sending
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setActiveChat(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Avatar className="h-10 w-10">
              <AvatarImage src={mockParticipant.avatar} />
              <AvatarFallback>
                {mockParticipant.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{mockParticipant.displayName}</h3>
                {mockParticipant.verified && (
                  <Badge variant="secondary" className="h-4 w-4 p-0">
                    ✓
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                @{mockParticipant.username}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] space-y-1`}>
                {msg.type === 'text' && (
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.senderId === 'user1'
                        ? 'chat-bubble-sent'
                        : 'chat-bubble-received'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                )}
                
                {msg.type === 'crypto' && (
                  <div
                    className={`px-4 py-3 rounded-2xl border-2 border-primary/20 ${
                      msg.senderId === 'user1'
                        ? 'bg-primary/5'
                        : 'bg-accent/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Coins className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        {msg.amount} {msg.currency}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cryptocurrency Transfer
                    </p>
                  </div>
                )}
                
                <p className={`text-xs text-muted-foreground ${
                  msg.senderId === 'user1' ? 'text-right' : 'text-left'
                }`}>
                  {formatDistanceToNow(msg.timestamp)} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Coins className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}