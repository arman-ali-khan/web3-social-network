'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/feed/post-card';

// Mock user posts
const mockUserPosts = [
  {
    id: 'user-1',
    author: {
      id: 'current-user',
      username: 'your_username',
      displayName: 'Your Name',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      verified: true,
    },
    content: 'Just launched my first NFT collection! 🎨 Excited to share my digital art with the Web3 community.',
    images: ['https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600'],
    likes: 89,
    comments: 23,
    shares: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    liked: false,
  },
];

// Mock NFTs
const mockUserNFTs = [
  {
    id: '1',
    name: 'My First NFT',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400',
    collection: 'Personal Collection',
    price: '1.5 ETH',
  },
  {
    id: '2',
    name: 'Digital Art #2',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
    collection: 'Personal Collection',
    price: '0.8 ETH',
  },
];

export function ProfileTabs() {
  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="nfts">NFTs</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="space-y-4 mt-6">
        {mockUserPosts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} />
        ))}
        
        {mockUserPosts.length === 0 && (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">No posts yet</h3>
                <p className="text-muted-foreground">Share your first post with the community</p>
              </div>
              <Button>Create Post</Button>
            </div>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="nfts" className="space-y-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockUserNFTs.map((nft) => (
            <Card key={nft.id} className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <h4 className="font-semibold text-sm truncate">{nft.name}</h4>
                <p className="text-xs text-muted-foreground">{nft.collection}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{nft.price}</span>
                  <Badge variant="outline" className="text-xs">Owned</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="activity" className="space-y-4 mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Liked a post', time: '2 hours ago' },
              { action: 'Followed @crypto_artist', time: '1 day ago' },
              { action: 'Minted NFT "Digital Dreams"', time: '3 days ago' },
              { action: 'Joined Web3Social', time: '1 week ago' },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-sm">{activity.action}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="about" className="space-y-4 mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {['NFTs', 'DeFi', 'Web3', 'Digital Art', 'Blockchain'].map((interest) => (
                  <Badge key={interest} variant="secondary">{interest}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Achievements</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🏆</span>
                  <span className="text-sm">Early Adopter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🎨</span>
                  <span className="text-sm">NFT Creator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💎</span>
                  <span className="text-sm">Diamond Hands</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}