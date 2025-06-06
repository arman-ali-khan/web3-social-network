'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Users, 
  ShoppingBag, 
  Image as ImageIcon, 
  Video,
  Clock,
  X,
  Heart,
  MessageCircle,
  Share,
  Play,
  Verified
} from 'lucide-react';

interface SearchPageProps {
  initialQuery?: string;
  onClose?: () => void;
}

// Mock data
const mockUsers = [
  {
    id: '1',
    username: 'crypto_artist',
    displayName: 'Crypto Artist',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    verified: true,
    followers: 12500,
    bio: 'Digital artist creating NFTs and Web3 experiences',
    isFollowing: false,
  },
  {
    id: '2',
    username: 'defi_trader',
    displayName: 'DeFi Trader',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    verified: false,
    followers: 8900,
    bio: 'Trading DeFi tokens and sharing market insights',
    isFollowing: true,
  },
  {
    id: '3',
    username: 'nft_collector',
    displayName: 'NFT Collector',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
    verified: true,
    followers: 15200,
    bio: 'Collecting rare NFTs and supporting digital artists',
    isFollowing: false,
  },
];

const mockProducts = [
  {
    id: '1',
    name: 'Cosmic Dreams NFT Collection',
    price: '2.5 ETH',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400',
    seller: 'crypto_artist',
    category: 'NFT',
    likes: 234,
    rarity: 'Rare',
  },
  {
    id: '2',
    name: 'Premium Wireless Headphones',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    seller: 'tech_store',
    category: 'Electronics',
    likes: 89,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Digital Art Course',
    price: '0.1 ETH',
    image: 'https://images.unsplash.com/photo-1606177475592-4bec65db7fc4?w=400',
    seller: 'art_academy',
    category: 'Education',
    likes: 156,
    students: 1200,
  },
];

const mockPhotos = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600',
    title: 'Abstract Digital Art',
    author: 'crypto_artist',
    likes: 342,
    comments: 28,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
    title: 'NFT Showcase',
    author: 'nft_collector',
    likes: 189,
    comments: 15,
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
    title: 'Modern Art Piece',
    author: 'digital_artist',
    likes: 267,
    comments: 42,
    timestamp: '1 day ago',
  },
];

const mockVideos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
    title: 'How to Create Your First NFT',
    author: 'crypto_artist',
    duration: '12:34',
    views: 15600,
    likes: 892,
    timestamp: '3 days ago',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600',
    title: 'DeFi Trading Strategies',
    author: 'defi_trader',
    duration: '8:45',
    views: 8900,
    likes: 456,
    timestamp: '1 week ago',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600',
    title: 'Web3 Future Predictions',
    author: 'blockchain_expert',
    duration: '15:22',
    views: 23400,
    likes: 1200,
    timestamp: '2 weeks ago',
  },
];

const recentSearches = [
  'crypto art',
  'defi trading',
  'nft marketplace',
  'blockchain news',
  'web3 tutorials',
];

export function SearchPage({ initialQuery = '', onClose }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter data based on query
  const filteredUsers = mockUsers.filter(user =>
    user.displayName.toLowerCase().includes(query.toLowerCase()) ||
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    user.bio.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPhotos = mockPhotos.filter(photo =>
    photo.title.toLowerCase().includes(query.toLowerCase()) ||
    photo.author.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVideos = mockVideos.filter(video =>
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.author.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = filteredUsers.length + filteredProducts.length + 
                      filteredPhotos.length + filteredVideos.length;

  const clearSearch = () => {
    setQuery('');
  };

  const handleRecentSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Search Header */}
      <div className="border-b p-4 space-y-4">
        <div className="flex items-center space-x-3">
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for people, posts, products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Recent Searches */}
        {!query && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Recent searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleRecentSearch(search)}
                  className="text-xs"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Results Summary */}
        {query && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {totalResults} results for "{query}"
            </p>
            <Badge variant="secondary">{totalResults}</Badge>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="text-xs">
                All ({totalResults})
              </TabsTrigger>
              <TabsTrigger value="users" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                People ({filteredUsers.length})
              </TabsTrigger>
              <TabsTrigger value="products" className="text-xs">
                <ShoppingBag className="h-3 w-3 mr-1" />
                Products ({filteredProducts.length})
              </TabsTrigger>
              <TabsTrigger value="photos" className="text-xs">
                <ImageIcon className="h-3 w-3 mr-1" />
                Photos ({filteredPhotos.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-xs">
                <Video className="h-3 w-3 mr-1" />
                Videos ({filteredVideos.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="p-4">
                <TabsContent value="all" className="space-y-6 mt-0">
                  {/* Users Section */}
                  {filteredUsers.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        People
                      </h3>
                      <div className="grid gap-3">
                        {filteredUsers.slice(0, 3).map((user) => (
                          <UserCard key={user.id} user={user} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products Section */}
                  {filteredProducts.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Products
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.slice(0, 3).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photos Section */}
                  {filteredPhotos.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Photos
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredPhotos.slice(0, 6).map((photo) => (
                          <PhotoCard key={photo.id} photo={photo} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos Section */}
                  {filteredVideos.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        Videos
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredVideos.slice(0, 4).map((video) => (
                          <VideoCard key={video.id} video={video} />
                        ))}
                      </div>
                    </div>
                  )}

                  {totalResults === 0 && query && (
                    <div className="text-center py-12">
                      <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search terms or browse popular content
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="users" className="mt-0">
                  <div className="grid gap-3">
                    {filteredUsers.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="products" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredPhotos.map((photo) => (
                      <PhotoCard key={photo.id} photo={photo} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

// User Card Component
function UserCard({ user }: { user: any }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{user.displayName}</h3>
              {user.verified && (
                <Verified className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            <p className="text-xs text-muted-foreground">
              {user.followers.toLocaleString()} followers
            </p>
          </div>
        </div>
        <Button 
          variant={user.isFollowing ? "outline" : "default"} 
          size="sm"
        >
          {user.isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-3">{user.bio}</p>
    </Card>
  );
}

// Product Card Component
function ProductCard({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">{product.price}</span>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>by {product.seller}</span>
          <div className="flex items-center space-x-1">
            <Heart className="h-3 w-3" />
            <span>{product.likes}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Photo Card Component
function PhotoCard({ photo }: { photo: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative group">
        <img
          src={photo.image}
          alt={photo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between items-center text-white text-xs">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{photo.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>{photo.comments}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white">
              <Share className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-2">
        <h3 className="font-medium text-sm line-clamp-1">{photo.title}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>by {photo.author}</span>
          <span>{photo.timestamp}</span>
        </div>
      </div>
    </Card>
  );
}

// Video Card Component
function VideoCard({ video }: { video: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/50 text-white hover:bg-black/70 rounded-full h-12 w-12 p-0"
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="text-xs">
            {video.duration}
          </Badge>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>by {video.author}</span>
          <span>{video.timestamp}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{video.views.toLocaleString()} views</span>
          <div className="flex items-center space-x-1">
            <Heart className="h-3 w-3" />
            <span>{video.likes}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}