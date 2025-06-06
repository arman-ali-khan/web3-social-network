'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { useAuthStore } from '@/store/auth-store';
import { Wallet, Mail, User, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [authMode, setAuthMode] = useState<'connect' | 'login' | 'register'>('connect');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');

  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { login } = useAuthStore();

  const handleWalletConnect = async (connector: any) => {
    try {
      await connect({ connector });
      
      // Simulate user creation from wallet connection
      if (address) {
        const user = {
          id: address,
          address,
          username: `user_${address.slice(-6)}`,
          displayName: `User ${address.slice(-4)}`,
          followers: 0,
          following: 0,
          verified: false,
          nfts: [],
          createdAt: new Date(),
        };
        
        login(user);
        toast.success('Wallet connected successfully!');
        onOpenChange(false);
      }
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleEmailAuth = async (mode: 'login' | 'register') => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (mode === 'register' && (!username || !displayName)) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Simulate email authentication
      const user = {
        id: `email_${Date.now()}`,
        email,
        username: mode === 'register' ? username : email.split('@')[0],
        displayName: mode === 'register' ? displayName : email.split('@')[0],
        followers: 0,
        following: 0,
        verified: false,
        nfts: [],
        createdAt: new Date(),
      };
      
      login(user);
      toast.success(mode === 'register' ? 'Account created successfully!' : 'Logged in successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Authentication failed');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl gradient-text">
            Welcome to Web3Social
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {authMode === 'connect' && (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-center">Connect Your Wallet</h3>
                {connectors.map((connector) => (
                  <Button
                    key={connector.id}
                    variant="outline"
                    className="w-full justify-start h-12"
                    onClick={() => handleWalletConnect(connector)}
                    disabled={isPending}
                  >
                    <Wallet className="w-5 h-5 mr-3" />
                    {connector.name}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setAuthMode('login')}
                  className="h-12"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAuthMode('register')}
                  className="h-12"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </>
          )}

          {authMode === 'login' && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleEmailAuth('login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setAuthMode('connect')}
                >
                  Back to options
                </Button>
              </div>
            </Card>
          )}

          {authMode === 'register' && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      placeholder="Your Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleEmailAuth('register')}
                >
                  Create Account
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setAuthMode('connect')}
                >
                  Back to options
                </Button>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}