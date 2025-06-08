'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Send, Link, X } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipient: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    verified: boolean;
  };
  postContent?: string;
}

export function SendMessageDialog({ 
  open, 
  onOpenChange, 
  recipient, 
  postContent 
}: SendMessageDialogProps) {
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const [includePost, setIncludePost] = useState(!!postContent);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    // In a real app, this would send the message via your messaging system
    console.log('Sending message:', {
      to: recipient.id,
      message,
      includePost,
      postContent: includePost ? postContent : null,
    });

    toast.success(`Message sent to ${recipient.displayName}!`);
    setMessage('');
    setIncludePost(!!postContent);
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Recipient Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={recipient.avatar} />
              <AvatarFallback>
                {recipient.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">{recipient.displayName}</h3>
                {recipient.verified && (
                  <Badge variant="secondary" className="h-4 w-4 p-0">✓</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{recipient.username}</p>
            </div>
          </div>

          {/* Post Reference (if applicable) */}
          {postContent && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Include post reference</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIncludePost(!includePost)}
                  className={includePost ? 'text-primary' : 'text-muted-foreground'}
                >
                  <Link className="h-4 w-4 mr-1" />
                  {includePost ? 'Included' : 'Include'}
                </Button>
              </div>
              
              {includePost && (
                <Card className="p-3 bg-muted/30 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIncludePost(false)}
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <p className="text-sm text-muted-foreground pr-6">
                    "{postContent.slice(0, 100)}{postContent.length > 100 ? '...' : ''}"
                  </p>
                </Card>
              )}
            </div>
          )}

          <Separator />

          {/* Message Composer */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.displayName?.slice(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder={`Message ${recipient.displayName}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="min-h-[100px] resize-none"
                  autoFocus
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Press Cmd/Ctrl + Enter to send
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {message.length}/1000
                    </span>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || message.length > 1000}
                      size="sm"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-xs text-muted-foreground">
              This message will be encrypted end-to-end
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}