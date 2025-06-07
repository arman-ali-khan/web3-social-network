import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Story {
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
  viewedBy: string[]; // user IDs who have viewed this story
}

export interface StoryGroup {
  userId: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    verified: boolean;
  };
  stories: Story[];
  hasUnviewed: boolean;
}

interface StoryState {
  stories: Story[];
  storyGroups: StoryGroup[];
  addStory: (story: Story) => void;
  markStoryAsViewed: (storyId: string, userId: string) => void;
  likeStory: (storyId: string) => void;
  getStoriesByUser: (userId: string) => Story[];
  getStoryGroups: () => StoryGroup[];
}

// Mock initial stories
const mockStories: Story[] = [
  {
    id: '1',
    author: {
      id: 'crypto_artist',
      username: 'crypto_artist',
      displayName: 'Crypto Artist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      verified: true,
    },
    content: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    views: 45,
    likes: 12,
    replies: 3,
    duration: 5,
    viewedBy: [],
  },
  {
    id: '2',
    author: {
      id: 'defi_trader',
      username: 'defi_trader',
      displayName: 'DeFi Trader',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      verified: false,
    },
    content: {
      type: 'text',
      text: 'Just made a huge profit on my latest DeFi trade! 🚀💰',
      backgroundColor: '#6366f1',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    views: 89,
    likes: 23,
    replies: 7,
    duration: 5,
    viewedBy: [],
  },
  {
    id: '3',
    author: {
      id: 'nft_collector',
      username: 'nft_collector',
      displayName: 'NFT Collector',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
      verified: true,
    },
    content: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    views: 156,
    likes: 34,
    replies: 12,
    duration: 5,
    viewedBy: [],
  },
  {
    id: '4',
    author: {
      id: 'crypto_artist',
      username: 'crypto_artist',
      displayName: 'Crypto Artist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      verified: true,
    },
    content: {
      type: 'text',
      text: 'Working on my next NFT collection. Can\'t wait to share it with you all! 🎨',
      backgroundColor: '#ec4899',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    views: 78,
    likes: 19,
    replies: 5,
    duration: 5,
    viewedBy: [],
  },
];

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      stories: mockStories,
      storyGroups: [],

      addStory: (story: Story) => {
        set((state) => ({
          stories: [story, ...state.stories],
        }));
      },

      markStoryAsViewed: (storyId: string, userId: string) => {
        set((state) => ({
          stories: state.stories.map((story) =>
            story.id === storyId
              ? {
                  ...story,
                  views: story.views + 1,
                  viewedBy: story.viewedBy.includes(userId)
                    ? story.viewedBy
                    : [...story.viewedBy, userId],
                }
              : story
          ),
        }));
      },

      likeStory: (storyId: string) => {
        set((state) => ({
          stories: state.stories.map((story) =>
            story.id === storyId
              ? { ...story, likes: story.likes + 1 }
              : story
          ),
        }));
      },

      getStoriesByUser: (userId: string) => {
        const { stories } = get();
        return stories.filter((story) => story.author.id === userId);
      },

      getStoryGroups: () => {
        const { stories } = get();
        const currentUserId = 'current-user'; // This should come from auth store
        
        // Group stories by user
        const groupedStories = stories.reduce((groups, story) => {
          const userId = story.author.id;
          if (!groups[userId]) {
            groups[userId] = {
              userId,
              user: story.author,
              stories: [],
              hasUnviewed: false,
            };
          }
          groups[userId].stories.push(story);
          
          // Check if user has unviewed stories - add safety check for viewedBy
          if (story.viewedBy && !story.viewedBy.includes(currentUserId)) {
            groups[userId].hasUnviewed = true;
          }
          
          return groups;
        }, {} as Record<string, StoryGroup>);

        // Convert to array and sort by most recent story
        return Object.values(groupedStories).sort((a, b) => {
          const aLatest = Math.max(...a.stories.map(s => s.timestamp.getTime()));
          const bLatest = Math.max(...b.stories.map(s => s.timestamp.getTime()));
          return bLatest - aLatest;
        });
      },
    }),
    {
      name: 'story-storage',
      deserialize: (str) => {
        const state = JSON.parse(str);
        // Convert timestamp strings back to Date objects
        if (state.state && state.state.stories) {
          state.state.stories = state.state.stories.map((story: any) => ({
            ...story,
            timestamp: new Date(story.timestamp),
          }));
        }
        return state;
      },
    }
  )
);