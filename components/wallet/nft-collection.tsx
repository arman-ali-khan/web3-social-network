'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Share, MoreHorizontal } from 'lucide-react';

// Mock NFT data
const mockNFTs = [
  {
    id: '1',
    name: 'Cosmic Dreams #001',
    collection: 'Cosmic Dreams',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400',
    lastPrice: '2.5 ETH',
    estimatedValue: '$4,850',
    rarity: 'Rare',
  },
  {
    id: '2',
    name: 'Digital Punk #1337',
    collection: 'Digital Punks',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
    lastPrice: '1.8 ETH',
    estimatedValue: '$3,200',
    rarity: 'Epic',
  },
  {
    id: '3',
    name: 'Abstract Art #42',
    collection: 'Abstract Collection',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    lastPrice: '0.75 ETH',
    estimatedValue: '$1,350',
    rarity: 'Common',
  },
  {
    id: '4',
    name: 'Gaming Sword',
    collection: 'Game Assets',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
    lastPrice: '0.5 ETH',
    estimatedValue: '$925',
    rarity: 'Legendary',
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'bg-gray-500';
    case 'rare':
      return 'bg-blue-500';
    case 'epic':
      return 'bg-purple-500';
    case 'legendary':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
};

export function NFTCollection() {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Your NFT Collection</h3>
            <p className="text-sm text-muted-foreground">
              {mockNFTs.length} items · Estimated value: $10,325
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockNFTs.map((nft) => (
            <Card key={nft.id} className="overflow-hidden nft-card">
              <div className="relative aspect-square">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                
                {/* Rarity Badge */}
                <Badge 
                  className={`absolute top-2 right-2 text-white ${getRarityColor(nft.rarity)}`}
                >
                  {nft.rarity}
                </Badge>
                
                {/* Hover Actions */}
                <div className="absolute bottom-2 left-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex justify-between">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 space-y-2">
                <div>
                  <h4 className="font-semibold text-sm truncate">{nft.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {nft.collection}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Last Sale</span>
                    <span className="font-medium">{nft.lastPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Est. Value</span>
                    <span className="font-medium text-green-600">{nft.estimatedValue}</span>
                  </div>
                
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}