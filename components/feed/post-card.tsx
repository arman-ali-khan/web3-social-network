'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Send,
  Bookmark
} from 'lucide-react';
import { CommentDialog } from './comment-dialog';
import { ImageDialog } from './image-dialog';
import { ShareDialog } from './share-dialog';
import { SendMessageDialog } from './send-message-dialog';

interface PostAuthor {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  verified: boolean;
}

interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  liked: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

export function PostCard({ post, onLike }: PostCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const truncatedContent = post.content.length > 200 
    ? post.content.slice(0, 200) + '...' 
    : post.content;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageDialog(true);
  };

  return (
    <>
      <Card className="p-0 overflow-hidden">
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>
                  {post.author.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm">{post.author.displayName}</h3>
                  {post.author.verified && (
                    <Badge variant="secondary" className="h-4 w-4 p-0">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  @{post.author.username} · {formatDistanceToNow(post.timestamp)} ago
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed">
            {showFullContent ? post.content : truncatedContent}
            {post.content.length > 200 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-primary text-sm ml-2 hover:underline"
              >
                {showFullContent ? 'Show less' : 'Show more'}
              </button>
            )}
          </p>
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="px-4 pb-3">
            {post.images.length === 1 ? (
              <div className="rounded-lg overflow-hidden cursor-pointer\" onClick={() => handleImageClick(0)}>
                <img
                  src={post.images[0]}
                  alt="Post content"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                {post.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative cursor-pointer" onClick={() => handleImageClick(index)}>
                    <img
                      src={image}
                      alt={`Post content ${index + 1}`}
                      className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {index === 3 && post.images!.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          +{post.images!.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-3 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                className={`space-x-2 ${post.liked ? 'text-red-500' : ''}`}
                onClick={() => onLike(post.id)}
              >
                <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                <span className="text-sm">{post.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="space-x-2"
                onClick={() => setShowComments(true)}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{post.comments}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="space-x-2"
                onClick={() => setShowShareDialog(true)}
              >
                <Share className="h-4 w-4" />
                <span className="text-sm">{post.shares}</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMessageDialog(true)}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Dialogs */}
      <CommentDialog
        open={showComments}
        onOpenChange={setShowComments}
        post={post}
      />

      <ImageDialog
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
        images={post.images || []}
        initialIndex={selectedImageIndex}
      />

      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        post={post}
      />

      <SendMessageDialog
        open={showMessageDialog}
        onOpenChange={setShowMessageDialog}
        recipient={post.author}
        postContent={post.content}
      />
    </>
  );
}