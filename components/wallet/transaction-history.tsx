'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowRightLeft,
  ShoppingBag,
  Coins
} from 'lucide-react';

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    type: 'send',
    amount: '0.5',
    currency: 'ETH',
    usdValue: '912.50',
    to: '0x1234...5678',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    hash: '0xabcd1234...',
  },
  {
    id: '2',
    type: 'receive',
    amount: '100',
    currency: 'USDC',
    usdValue: '100.00',
    from: '0x9876...4321',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    hash: '0xefgh5678...',
  },
  {
    id: '3',
    type: 'swap',
    amount: '1.2',
    currency: 'ETH',
    swapTo: '2400 USDC',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    hash: '0xijkl9012...',
  },
  {
    id: '4',
    type: 'purchase',
    amount: '0.25',
    currency: 'ETH',
    item: 'Cosmic Dreams NFT',
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    hash: '0xmnop3456...',
  },
  {
    id: '5',
    type: 'stake',
    amount: '500',
    currency: 'MATIC',
    platform: 'Polygon Staking',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    hash: '0xqrst7890...',
  },
];

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'send':
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    case 'receive':
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    case 'swap':
      return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
    case 'purchase':
      return <ShoppingBag className="h-4 w-4 text-purple-500" />;
    case 'stake':
      return <Coins className="h-4 w-4 text-orange-500" />;
    default:
      return <ArrowRightLeft className="h-4 w-4" />;
  }
};

const getTransactionTitle = (transaction: any) => {
  switch (transaction.type) {
    case 'send':
      return `Sent to ${transaction.to}`;
    case 'receive':
      return `Received from ${transaction.from}`;
    case 'swap':
      return `Swapped to ${transaction.swapTo}`;
    case 'purchase':
      return `Purchased ${transaction.item}`;
    case 'stake':
      return `Staked on ${transaction.platform}`;
    default:
      return 'Transaction';
  }
};

export function TransactionHistory() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <Badge variant="outline">Last 30 days</Badge>
      </div>
      
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                {getTransactionIcon(transaction.type)}
              </div>
              
              <div>
                <h4 className="font-medium text-sm">
                  {getTransactionTitle(transaction)}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(transaction.timestamp)} ago
                  </p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-sm">
                {transaction.type === 'receive' ? '+' : '-'}
                {transaction.amount} {transaction.currency}
              </p>
              {transaction.usdValue && (
                <p className="text-xs text-muted-foreground">
                  ${transaction.usdValue}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}