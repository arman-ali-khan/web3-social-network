'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth-store';
import { QRGenerator } from './qr-generator';
import { QRScanner } from './qr-scanner';
import { 
  QrCode, 
  Camera, 
  Copy, 
  Share,
  Wallet,
  User,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeDialog({ open, onOpenChange }: QRCodeDialogProps) {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('generate');
  const [qrType, setQrType] = useState<'profile' | 'wallet' | 'custom'>('profile');
  const [customText, setCustomText] = useState('');

  const getQRData = () => {
    switch (qrType) {
      case 'profile':
        return `https://web3social.app/profile/${user?.username}`;
      case 'wallet':
        return user?.address || 'No wallet connected';
      case 'custom':
        return customText;
      default:
        return '';
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Web3Social',
          text: 'Check out my Web3Social profile!',
          url: text,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      handleCopy(text);
    }
  };

  const handleScanResult = (result: string) => {
    console.log('QR Scan Result:', result);
    toast.success(`Scanned: ${result}`);
    
    // Handle different types of QR codes
    if (result.startsWith('http')) {
      // URL - could open in browser
      toast.info('URL detected - tap to open');
    } else if (result.startsWith('0x')) {
      // Wallet address
      toast.info('Wallet address detected');
    } else {
      // Generic text
      toast.info('Text content scanned');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5" />
            <span>QR Code</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate" className="flex items-center space-x-2">
              <QrCode className="h-4 w-4" />
              <span>Generate</span>
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Scan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            {/* QR Type Selection */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={qrType === 'profile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQrType('profile')}
                className="flex flex-col space-y-1 h-auto p-3"
              >
                <User className="h-4 w-4" />
                <span className="text-xs">Profile</span>
              </Button>
              <Button
                variant={qrType === 'wallet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQrType('wallet')}
                className="flex flex-col space-y-1 h-auto p-3"
              >
                <Wallet className="h-4 w-4" />
                <span className="text-xs">Wallet</span>
              </Button>
              <Button
                variant={qrType === 'custom' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQrType('custom')}
                className="flex flex-col space-y-1 h-auto p-3"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">Custom</span>
              </Button>
            </div>

            {/* Custom Text Input */}
            {qrType === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="custom-text">Custom Text</Label>
                <Input
                  id="custom-text"
                  placeholder="Enter text, URL, or message..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                />
              </div>
            )}

            {/* QR Code Display */}
            <Card className="p-4">
              <div className="flex flex-col items-center space-y-4">
                <QRGenerator 
                  value={getQRData()} 
                  size={200}
                  className="border rounded-lg"
                />
                
                <div className="text-center space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {qrType === 'profile' ? 'Profile Link' : 
                       qrType === 'wallet' ? 'Wallet Address' : 'Custom Text'}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground font-mono break-all">
                    {getQRData()}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(getQRData())}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(getQRData())}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  {qrType === 'profile' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(getQRData(), '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="scan" className="space-y-4">
            <Card className="p-4">
              <QRScanner onResult={handleScanResult} />
            </Card>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Point your camera at a QR code to scan it</p>
              <p className="text-xs mt-1">
                Supports URLs, wallet addresses, and text content
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}