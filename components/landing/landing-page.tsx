'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AuthDialog } from '@/components/auth/auth-dialog';
import { 
  Wallet, 
  MessageCircle, 
  ShoppingBag, 
  Users, 
  Shield, 
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  Star
} from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Web3 Wallet Integration',
    description: 'Connect with MetaMask, WalletConnect, and other popular wallets',
  },
  {
    icon: MessageCircle,
    title: 'Encrypted Messaging',
    description: 'End-to-end encrypted communications with crypto payments',
  },
  {
    icon: ShoppingBag,
    title: 'Decentralized Marketplace',
    description: 'Buy and sell with cryptocurrency, NFTs, and traditional payments',
  },
  {
    icon: Users,
    title: 'Social Communities',
    description: 'Join DAOs, create groups, and engage with like-minded users',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data belongs to you, secured by blockchain technology',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with Layer 2 solutions and caching',
  },
];

export function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            <Globe className="w-4 h-4 mr-2" />
            The Future of Social Media is Here
          </Badge>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Welcome to{' '}
            <span className="gradient-text">Web3Social</span>
          </h1>
          
          <p className="mx-auto mb-8 text-lg text-muted-foreground md:text-xl max-w-3xl">
            The first truly decentralized social platform combining messaging, 
            marketplace, and DeFi in one seamless experience. Own your data, 
            control your privacy, and earn from your content.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-bg hover:opacity-90 transition-opacity"
              onClick={() => setAuthOpen(true)}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </div>
        </motion.div>

        {/* Hero Image/Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mock Chat Interface */}
                <Card className="p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20" />
                    <div className="space-y-1">
                      <div className="h-3 bg-muted rounded w-20" />
                      <div className="h-2 bg-muted/50 rounded w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="chat-bubble-received p-3 text-sm">
                      Hey! Want to buy my NFT?
                    </div>
                    <div className="chat-bubble-sent p-3 text-sm ml-8">
                      Sure! Let me send you 0.5 ETH
                    </div>
                  </div>
                </Card>

                {/* Mock Wallet */}
                <Card className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Wallet</h3>
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ETH</span>
                      <span className="font-semibold">2.45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">USDC</span>
                      <span className="font-semibold">1,250.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">NFTs</span>
                      <span className="font-semibold">12</span>
                    </div>
                  </div>
                </Card>

                {/* Mock Social Feed */}
                <Card className="p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20" />
                    <div className="space-y-1">
                      <div className="h-3 bg-muted rounded w-24" />
                      <div className="h-2 bg-muted/50 rounded w-12" />
                    </div>
                  </div>
                  <div className="h-20 bg-muted/30 rounded-lg" />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex space-x-4">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        24
                      </span>
                      <span>12 comments</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything you need in one app
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From social networking to DeFi, Web3Social brings together all the tools 
            you need for the decentralized future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <Card className="p-12 gradient-bg text-primary-foreground">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to join the revolution?
            </h2>
            <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of users already experiencing the future of social media. 
              Connect your wallet and start exploring today.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => setAuthOpen(true)}
            >
              Connect Wallet
              <Wallet className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </motion.div>
      </section>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}