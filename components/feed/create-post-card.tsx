'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth-store';
import { 
  Image, 
  Smile, 
  MapPin, 
  Hash,
  Coins
} from 'lucide-react';

export function CreatePostCard() {
  const { user } = useAuthStore();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePost = () => {
    if (!content.trim()) return;
    
    // Handle post creation
    console.log('Creating post:', content);
    setContent('');
    setIsExpanded(false);
  };

  return (
    <Card className="p-4">
      <div className="flex space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user?.displayName?.slice(0, 2).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What's happening in Web3?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="min-h-[80px] resize-none border-none p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
          />
          
          {isExpanded && (
            <>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <MapPin className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Hash className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Coins className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground">
                    {280 - content.length}
                  </div>
                  <Button 
                    onClick={handlePost}
                    disabled={!content.trim() || content.length > 280}
                    size="sm"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}