'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Reply, Send, MoreHorizontal } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

interface Comment {
  id: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    verified: boolean;
  };
  content: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: {
    id: string;
    author: {
      id: string;
      username: string;
      displayName: string;
      avatar?: string;
      verified: boolean;
    };
    content: string;
  };
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      username: 'crypto_enthusiast',
      displayName: 'Crypto Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      verified: false,
    },
    content: 'This is amazing! Love the creativity in Web3 space 🚀',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 5,
    liked: false,
  },
  {
    id: '2',
    author: {
      id: 'user2',
      username: 'nft_lover',
      displayName: 'NFT Lover',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
      verified: true,
    },
    content: 'When will this be available for purchase?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    likes: 2,
    liked: true,
  },
  {
    id: '3',
    author: {
      id: 'user3',
      username: 'blockchain_dev',
      displayName: 'Blockchain Dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      verified: false,
    },
    content: 'The technical implementation behind this must be fascinating. Any details on the smart contract?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    likes: 8,
    liked: false,
  },
];

export function CommentDialog({ open, onOpenChange, post }: CommentDialogProps) {
  const { user } = useAuthStore();
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        verified: user.verified,
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      liked: false,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setReplyingTo(null);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        {/* Original Post */}
        <div className="border-b pb-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>
                {post.author.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">{post.author.displayName}</h3>
                {post.author.verified && (
                  <Badge variant="secondary" className="h-4 w-4 p-0">✓</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{post.author.username}</p>
              <p className="text-sm mt-2">{post.content}</p>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback>
                    {comment.author.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-sm">{comment.author.displayName}</h4>
                      {comment.author.verified && (
                        <Badge variant="secondary" className="h-3 w-3 p-0">✓</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.timestamp)} ago
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-auto p-0 ${comment.liked ? 'text-red-500' : 'text-muted-foreground'}`}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <Heart className={`h-3 w-3 mr-1 ${comment.liked ? 'fill-current' : ''}`} />
                      {comment.likes}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Comment Input */}
        <div className="border-t pt-4">
          {replyingTo && (
            <div className="mb-2 text-xs text-muted-foreground">
              Replying to {comments.find(c => c.id === replyingTo)?.author.displayName}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2 text-primary"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </Button>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user?.displayName?.slice(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 flex items-center space-x-2">
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}