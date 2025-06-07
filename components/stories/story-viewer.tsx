'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageCircle, 
  Send,
  MoreHorizontal,
  Volume2,
  VolumeX
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Story {
  id: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    verified: boolean;
  };
  content: {
    type: 'image' | 'video' | 'text';
    url?: string;
    text?: string;
    backgroundColor?: string;
  };
  timestamp: Date;
  views: number;
  likes: number;
  replies: number;
  duration?: number; // in seconds
}

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  initialUserIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StoryViewer({ 
  stories, 
  initialStoryIndex, 
  initialUserIndex, 
  open, 
  onOpenChange 
}: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentStory = stories[currentStoryIndex];
  const storyDuration = currentStory?.duration || 5; // Default 5 seconds

  useEffect(() => {
    if (!open || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (storyDuration * 10));
        if (newProgress >= 100) {
          handleNextStory();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [open, isPaused, currentStoryIndex, storyDuration]);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onOpenChange(false);
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const handleStoryClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    
    if (clickX < width / 2) {
      handlePrevStory();
    } else {
      handleNextStory();
    }
  };

  if (!currentStory) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 bg-black border-none">
        <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
          {/* Progress bars */}
          <div className="absolute top-2 left-2 right-2 z-20 flex space-x-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100"
                  style={{ 
                    width: index < currentStoryIndex ? '100%' : 
                           index === currentStoryIndex ? `${progress}%` : '0%' 
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={currentStory.author.avatar} />
                <AvatarFallback className="text-xs">
                  {currentStory.author.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-white font-semibold text-sm">
                    {currentStory.author.displayName}
                  </span>
                  {currentStory.author.verified && (
                    <Badge variant="secondary" className="h-3 w-3 p-0">
                      ✓
                    </Badge>
                  )}
                </div>
                <span className="text-white/70 text-xs">
                  {formatDistanceToNow(currentStory.timestamp)} ago
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {currentStory.content.type === 'video' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Story Content */}
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={handleStoryClick}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {currentStory.content.type === 'image' && (
              <img
                src={currentStory.content.url}
                alt="Story content"
                className="w-full h-full object-cover"
              />
            )}
            
            {currentStory.content.type === 'video' && (
              <video
                src={currentStory.content.url}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
              />
            )}
            
            {currentStory.content.type === 'text' && (
              <div 
                className="w-full h-full flex items-center justify-center p-8"
                style={{ backgroundColor: currentStory.content.backgroundColor || '#6366f1' }}
              >
                <p className="text-white text-xl font-bold text-center leading-relaxed">
                  {currentStory.content.text}
                </p>
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          {currentStoryIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevStory}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-10 w-10 p-0 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          
          {currentStoryIndex < stories.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextStory}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-10 w-10 p-0 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Bottom actions */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{currentStory.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{currentStory.replies}</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
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