'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Copy, 
  Share, 
  MessageCircle, 
  Mail, 
  Twitter,
  Facebook,
  Linkedin,
  Link,
  QrCode,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: {
    id: string;
    author: {
      id: string;
      username: string;
      displayName: string;
      avatar?: string;
      verified: boolean;
    };
    content: string;
  };
}

const shareOptions = [
  {
    id: 'copy',
    label: 'Copy Link',
    icon: Copy,
    color: 'text-gray-600',
    action: 'copy',
  },
  {
    id: 'message',
    label: 'Send Message',
    icon: MessageCircle,
    color: 'text-blue-600',
    action: 'message',
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    color: 'text-green-600',
    action: 'email',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    icon: Twitter,
    color: 'text-blue-400',
    action: 'twitter',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: Facebook,
    color: 'text-blue-700',
    action: 'facebook',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-800',
    action: 'linkedin',
  },
  {
    id: 'qr',
    label: 'QR Code',
    icon: QrCode,
    color: 'text-purple-600',
    action: 'qr',
  },
];

export function ShareDialog({ open, onOpenChange, post }: ShareDialogProps) {
  const [customMessage, setCustomMessage] = useState('');
  const [showQR, setShowQR] = useState(false);
  
  const postUrl = `https://web3social.app/post/${post.id}`;
  const shareText = `Check out this post by ${post.author.displayName}: "${post.content.slice(0, 100)}${post.content.length > 100 ? '...' : ''}"`;

  const handleShare = async (action: string) => {
    switch (action) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(postUrl);
          toast.success('Link copied to clipboard!');
        } catch (error) {
          toast.error('Failed to copy link');
        }
        break;
        
      case 'message':
        // This would open a message dialog or navigate to messages
        toast.info('Opening message composer...');
        break;
        
      case 'email':
        const emailSubject = encodeURIComponent(`Shared from Web3Social`);
        const emailBody = encodeURIComponent(`${shareText}\n\n${postUrl}`);
        window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
        break;
        
      case 'twitter':
        const twitterText = encodeURIComponent(`${shareText}\n\n${postUrl}`);
        window.open(`https://twitter.com/intent/tweet?text=${twitterText}`, '_blank');
        break;
        
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
        break;
        
      case 'linkedin':
        const linkedinUrl = encodeURIComponent(postUrl);
        const linkedinTitle = encodeURIComponent(shareText);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${linkedinUrl}&title=${linkedinTitle}`, '_blank');
        break;
        
      case 'qr':
        setShowQR(true);
        break;
        
      default:
        toast.info(`Sharing via ${action}...`);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Web3Social Post',
          text: shareText,
          url: postUrl,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      handleShare('copy');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>

        {!showQR ? (
          <div className="space-y-6">
            {/* Post Preview */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-sm">{post.author.displayName}</h3>
                    {post.author.verified && (
                      <Badge variant="secondary" className="h-4 w-4 p-0">✓</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">@{post.author.username}</p>
                  <p className="text-sm mt-2 line-clamp-3">{post.content}</p>
                </div>
              </div>
            </div>

            {/* Quick Share */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Quick Share</h4>
              <div className="flex items-center space-x-2">
                <Input
                  value={postUrl}
                  readOnly
                  className="flex-1 text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              {navigator.share && (
                <Button
                  onClick={handleNativeShare}
                  className="w-full"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              )}
            </div>

            <Separator />

            {/* Share Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Share to</h4>
              <div className="grid grid-cols-4 gap-3">
                {shareOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="flex flex-col space-y-2 h-auto p-4"
                    onClick={() => handleShare(option.action)}
                  >
                    <option.icon className={`h-5 w-5 ${option.color}`} />
                    <span className="text-xs">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Add a message (optional)</h4>
              <Textarea
                placeholder="Add your thoughts about this post..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* QR Code View */}
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">QR Code</p>
                  <p className="text-xs text-muted-foreground">Scan to view post</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // In a real app, this would generate and download a QR code
                    toast.info('QR code download would start here');
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowQR(false)}
                >
                  Back to Share Options
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}