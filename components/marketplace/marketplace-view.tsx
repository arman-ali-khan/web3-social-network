'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from './product-grid';
import { CategoryFilter } from './category-filter';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', count: 1234 },
  { id: 'nft', label: 'NFTs', count: 456 },
  { id: 'physical', label: 'Physical', count: 321 },
  { id: 'digital', label: 'Digital', count: 234 },
  { id: 'collectibles', label: 'Collectibles', count: 123 },
  { id: 'art', label: 'Art', count: 100 },
];

export function MarketplaceView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filters */}
      <div className="border-b p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, NFTs, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="p-4">
            {/* Featured Section */}
            <div className="mb-6">
              <Card className="p-6 gradient-bg text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Featured Collection</h2>
                    <p className="opacity-90 mb-4">
                      Discover the hottest NFTs and digital assets
                    </p>
                    <Button variant="secondary" size="sm">
                      Explore Now
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-32 h-32 bg-white/10 rounded-2xl" />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Trending Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">🔥 Trending Now</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="flex-shrink-0 w-40 p-3">
                    <div className="aspect-square bg-muted rounded-lg mb-2" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm truncate">
                        Cool NFT #{i}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        0.{i} ETH
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        #{i * 123}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Product Grid */}
            <ProductGrid category={selectedCategory} searchQuery={searchQuery} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}