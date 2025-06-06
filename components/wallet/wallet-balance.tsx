'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAccount, useBalance } from 'wagmi';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

// Mock balance data
const mockBalances = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '2.4567',
    usdValue: '4,123.45',
    change24h: 5.23,
    logo: '🔷',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '1,250.00',
    usdValue: '1,250.00',
    change24h: 0.01,
    logo: '💎',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    balance: '850.25',
    usdValue: '678.92',
    change24h: -2.15,
    logo: '🟣',
  },
];

export function WalletBalance() {
  const [hideBalance, setHideBalance] = useState(false);
  const { address, isConnected } = useAccount();

  const totalUsdValue = mockBalances.reduce((sum, token) => 
    sum + parseFloat(token.usdValue.replace(',', '')), 0
  );

  return (
    <div className="space-y-4">
      {/* Main Balance Card */}
      <Card className="p-6 gradient-bg text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold opacity-90">Total Balance</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-3xl font-bold">
                {hideBalance ? '****' : `$${totalUsdValue.toLocaleString()}`}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHideBalance(!hideBalance)}
                className="text-primary-foreground hover:bg-white/10"
              >
                {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 text-sm opacity-90">
              <TrendingUp className="h-4 w-4" />
              <span>+12.5%</span>
            </div>
            <p className="text-xs opacity-75">24h change</p>
          </div>
        </div>
        
        {isConnected && (
          <div className="pt-4 border-t border-white/20">
            <p className="text-xs opacity-75">Connected Wallet</p>
            <p className="font-mono text-sm">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        )}
      </Card>
      
      {/* Token Balances */}
      <div className="space-y-3">
        {mockBalances.map((token) => (
          <Card key={token.symbol} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-lg">{token.logo}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{token.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{token.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">
                  {hideBalance ? '****' : token.balance} {token.symbol}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">
                    ${hideBalance ? '****' : token.usdValue}
                  </p>
                  <Badge 
                    variant={token.change24h >= 0 ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    <div className="flex items-center space-x-1">
                      {token.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{Math.abs(token.change24h)}%</span>
                    </div>
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}