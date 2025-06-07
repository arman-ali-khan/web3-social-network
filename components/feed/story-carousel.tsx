'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';
import { useStoryStore } from '@/store/story-store';
import { StoryViewer } from '@/components/stories/story-viewer';
import { CreateStoryDialog } from '@/components/stories/create-story-dialog';

export function StoryCarousel() {
  const { stories, storyGroups, getStoryGroups, addStory } = useStoryStore();
  const [selectedStoryGroup, setSelectedStoryGroup] = useState<number | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const groups = getStoryGroups();
  const allStories = stories.filter(story => 
    selectedStoryGroup !== null ? 
    story.author.id === groups[selectedStoryGroup]?.userId : 
    false
  );

  const handleStoryClick = (groupIndex: number) => {
    setSelectedStoryGroup(groupIndex);
  };

  const handleStoryCreated = (newStory: any) => {
    addStory(newStory);
  };

  return (
    <>
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
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-xs text-center max-w-[60px] truncate">
              Your Story
            </span>
          </div>

          {/* Story Groups */}
          {groups.map((group, index) => (
            <div 
              key={group.userId} 
              className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer"
              onClick={() => handleStoryClick(index)}
            >
              <div className="relative">
                <div className={`p-1 rounded-full ${
                  group.hasUnviewed 
                    ? 'bg-gradient-to-tr from-primary to-accent' 
                    : 'bg-muted'
                }`}>
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={group.user.avatar} />
                    <AvatarFallback>
                      {group.user.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {group.hasUnviewed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background" />
                )}
              </div>
              <span className="text-xs text-center max-w-[60px] truncate">
                {group.user.displayName}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Story Viewer */}
      {selectedStoryGroup !== null && (
        <StoryViewer
          stories={allStories}
          initialStoryIndex={0}
          initialUserIndex={selectedStoryGroup}
          open={selectedStoryGroup !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedStoryGroup(null);
          }}
        />
      )}

      {/* Create Story Dialog */}
      <CreateStoryDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onStoryCreated={handleStoryCreated}
      />
    </>
  );
}