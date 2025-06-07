'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStoryStore } from '@/store/story-store';
import { StoryViewer } from './story-viewer';
import { CreateStoryDialog } from './create-story-dialog';
import { formatDistanceToNow } from 'date-fns';
import { 
  Plus, 
  Eye, 
  Heart, 
  MessageCircle,
  Play,
  Image as ImageIcon,
  Type
} from 'lucide-react';

export function StoryPage() {
  const { stories, getStoryGroups, addStory } = useStoryStore();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const storyGroups = getStoryGroups();
  const currentUserStories = stories.filter(story => story.author.id === 'current-user');

  const handleStoryClick = (storyIndex: number) => {
    setSelectedStoryIndex(storyIndex);
  };

  const handleStoryCreated = (newStory: any) => {
    addStory(newStory);
  };

  const getStoryIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'text':
        return <Type className="h-4 w-4" />;
      default:
        return <ImageIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Stories</h1>
              <p className="text-muted-foreground">
                Share moments that disappear in 24 hours
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Story
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Stories</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="yours">Your Stories</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Story Groups Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {storyGroups.map((group, groupIndex) => (
                  <Card 
                    key={group.userId} 
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      const firstStoryIndex = stories.findIndex(s => s.author.id === group.userId);
                      if (firstStoryIndex !== -1) {
                        handleStoryClick(firstStoryIndex);
                      }
                    }}
                  >
                    <div className="relative aspect-[3/4]">
                      {/* Story Preview */}
                      {group.stories[0]?.content.type === 'image' && (
                        <img
                          src={group.stories[0].content.url}
                          alt="Story preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      {group.stories[0]?.content.type === 'text' && (
                        <div 
                          className="w-full h-full flex items-center justify-center p-4"
                          style={{ backgroundColor: group.stories[0].content.backgroundColor }}
                        >
                          <p className="text-white text-sm font-bold text-center line-clamp-3">
                            {group.stories[0].content.text}
                          </p>
                        </div>
                      )}
                      {group.stories[0]?.content.type === 'video' && (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* User Info */}
                      <div className="absolute top-3 left-3">
                        <Avatar className={`h-8 w-8 border-2 ${
                          group.hasUnviewed ? 'border-primary' : 'border-white'
                        }`}>
                          <AvatarImage src={group.user.avatar} />
                          <AvatarFallback className="text-xs">
                            {group.user.displayName.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      {/* Story Count */}
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="text-xs">
                          {group.stories.length}
                        </Badge>
                      </div>
                      
                      {/* Bottom Info */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="text-white font-semibold text-sm truncate">
                            {group.user.displayName}
                          </span>
                          {group.user.verified && (
                            <Badge variant="secondary" className="h-3 w-3 p-0">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/80 text-xs">
                          {formatDistanceToNow(group.stories[0]?.timestamp)} ago
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="following" className="space-y-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No stories from people you follow</h3>
                <p className="text-muted-foreground">
                  When people you follow share stories, they'll appear here
                </p>
              </div>
            </TabsContent>

            <TabsContent value="yours" className="space-y-6">
              {currentUserStories.length > 0 ? (
                <div className="space-y-4">
                  {currentUserStories.map((story, index) => (
                    <Card key={story.id} className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          {story.content.type === 'image' && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={story.content.url}
                                alt="Story thumbnail"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {story.content.type === 'text' && (
                            <div 
                              className="w-16 h-16 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: story.content.backgroundColor }}
                            >
                              <Type className="h-6 w-6 text-white" />
                            </div>
                          )}
                          {story.content.type === 'video' && (
                            <div className="w-16 h-16 rounded-lg bg-black flex items-center justify-center">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          )}
                          
                          <div className="absolute -top-1 -right-1">
                            {getStoryIcon(story.content.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">
                                {story.content.type === 'text' 
                                  ? story.content.text?.slice(0, 50) + '...'
                                  : `${story.content.type} story`
                                }
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatDistanceToNow(story.timestamp)} ago
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{story.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-4 w-4" />
                                <span>{story.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{story.replies}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your first story to get started
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Story
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          initialUserIndex={0}
          open={selectedStoryIndex !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedStoryIndex(null);
          }}
        />
      )}

      {/* Create Story Dialog */}
      <CreateStoryDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onStoryCreated={handleStoryCreated}
      />
    </div>
  );
}