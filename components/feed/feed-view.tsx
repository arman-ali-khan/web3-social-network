'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PostCard } from './post-card';
import { CreatePostCard } from './create-post-card';
import { StoryCarousel } from './story-carousel';

// Mock data
const mockPosts = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'crypto_artist',
      displayName: 'Crypto Artist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      verified: true,
    },
    content: 'Just minted my latest NFT collection! 🎨 The intersection of AI and blockchain art is fascinating.',
    images: ['https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600'],
    likes: 42,
    comments: 12,
    shares: 8,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    liked: false,
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'defi_trader',
      displayName: 'DeFi Trader',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      verified: false,
    },
    content: 'Market analysis: ETH looking bullish 📈 What are your thoughts on the upcoming merge?',
    likes: 128,
    comments: 34,
    shares: 22,
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    liked: true,
  },
  {
    id: '3',
    author: {
      id: '3',
      username: 'nft_collector',
      displayName: 'NFT Collector',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
      verified: true,
    },
    content: 'Added this beautiful piece to my collection 💎 Supporting artists in the Web3 space!',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
      'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600',
    ],
    likes: 89,
    comments: 18,
    shares: 15,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    liked: false,
  },
];

export function FeedView() {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full custom-scrollbar">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <StoryCarousel />
          <CreatePostCard />
          
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={handleLike}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}