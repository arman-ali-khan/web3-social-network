'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

// Mock products
const mockProducts = [
  {
    id: '1',
    title: 'Cosmic Dreams #001',
    description: 'A mesmerizing digital art piece exploring the cosmos',
    price: '2.5',
    currency: 'ETH',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400',
    category: 'nft',
    creator: {
      name: 'Crypto Artist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      verified: true,
    },
    likes: 234,
    views: 1520,
  },
  {
    id: '2',
    title: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: '299',
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'physical',
    creator: {
      name: 'Tech Store',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      verified: false,
    },
    likes: 45,
    views: 890,
  },
  {
    id: '3',
    title: 'Digital Photography Course',
    description: 'Complete guide to mastering digital photography',
    price: '0.1',
    currency: 'ETH',
    image: 'https://images.unsplash.com/photo-1606177475592-4bec65db7fc4?w=400',
    category: 'digital',
    creator: {
      name: 'Photo Master',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
      verified: true,
    },
    likes: 128,
    views: 543,
  },
  {
    id: '4',
    title: 'Rare Trading Card',
    description: 'Limited edition holographic trading card',
    price: '150',
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'collectibles',
    creator: {
      name: 'Card Collector',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      verified: false,
    },
    likes: 67,
    views: 324,
  },
  {
    id: '5',
    title: 'Abstract Canvas #12',
    description: 'Original abstract painting on canvas',
    price: '1.8',
    currency: 'ETH',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    category: 'art',
    creator: {
      name: 'Modern Artist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      verified: true,
    },
    likes: 91,
    views: 445,
  },
  {
    id: '6',
    title: 'Gaming NFT Sword',
    description: 'Legendary sword for use in multiple Web3 games',
    price: '0.75',
    currency: 'ETH',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
    category: 'nft',
    creator: {
      name: 'Game Studio',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72c5cd4?w=400',
      verified: true,
    },
    likes: 156,
    views: 782,
  },
];

interface ProductGridProps {
  category: string;
  searchQuery: string;
}

export function ProductGrid({ category, searchQuery }: ProductGridProps) {
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            
            {/* Hover Actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Category Badge */}
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 capitalize text-xs"
            >
              {product.category}
            </Badge>
          </div>
          
          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-sm line-clamp-1">
                {product.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {product.description}
              </p>
            </div>
            
            {/* Creator */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={product.creator.avatar} />
                <AvatarFallback className="text-xs">
                  {product.creator.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">
                  {product.creator.name}
                </span>
                {product.creator.verified && (
                  <Badge variant="secondary" className="h-3 w-3 p-0 text-xs">
                    ✓
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>{product.likes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{product.views}</span>
                </span>
              </div>
            </div>
            
            {/* Price and Action */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                <span className="font-bold text-lg">
                  {product.price} {product.currency}
                </span>
              </div>
              <Button size="sm" className="space-x-1">
                <ShoppingCart className="h-3 w-3" />
                <span>Buy</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}