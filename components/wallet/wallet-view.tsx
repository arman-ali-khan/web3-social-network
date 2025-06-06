'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletBalance } from './wallet-balance';
import { TransactionHistory } from './transaction-history';
import { NFTCollection } from './nft-collection';
import { QuickActions } from './quick-actions';

export function WalletView() {
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Wallet Balance */}
          <WalletBalance />
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Wallet Tabs */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
              <TabsTrigger value="defi">DeFi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-4">
              <TransactionHistory />
            </TabsContent>
            
            <TabsContent value="nfts" className="space-y-4">
              <NFTCollection />
            </TabsContent>
            
            <TabsContent value="defi" className="space-y-4">
              <Card className="p-6 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">DeFi Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Stake, lend, and earn with your crypto assets
                    </p>
                  </div>
                  <Button>Get Notified</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}