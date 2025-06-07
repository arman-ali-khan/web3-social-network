'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Image as ImageIcon, 
  Type, 
  Upload,
  X,
  Palette,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

interface CreateStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStoryCreated?: (story: any) => void;
}

const backgroundColors = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', 
  '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
];

const textSizes = [
  { label: 'Small', value: 'text-lg' },
  { label: 'Medium', value: 'text-xl' },
  { label: 'Large', value: 'text-2xl' },
  { label: 'Extra Large', value: 'text-3xl' },
];

export function CreateStoryDialog({ open, onOpenChange, onStoryCreated }: CreateStoryDialogProps) {
  const [storyType, setStoryType] = useState<'image' | 'video' | 'text'>('image');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
  const [textSize, setTextSize] = useState(textSizes[1].value);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast.error('Please select an image or video file');
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setSelectedFile(file);
    setStoryType(isImage ? 'image' : 'video');
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleCreateStory = async () => {
    if (storyType === 'text' && !textContent.trim()) {
      toast.error('Please enter some text for your story');
      return;
    }

    if ((storyType === 'image' || storyType === 'video') && !selectedFile) {
      toast.error('Please select a file for your story');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newStory = {
        id: Date.now().toString(),
        author: {
          id: 'current-user',
          username: 'your_username',
          displayName: 'Your Name',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
          verified: true,
        },
        content: {
          type: storyType,
          url: storyType !== 'text' ? previewUrl : undefined,
          text: storyType === 'text' ? textContent : undefined,
          backgroundColor: storyType === 'text' ? backgroundColor : undefined,
        },
        timestamp: new Date(),
        views: 0,
        likes: 0,
        replies: 0,
        duration: storyType === 'text' ? 5 : storyType === 'image' ? 5 : 10,
        viewedBy: [], // Add the missing viewedBy property
      };

      onStoryCreated?.(newStory);
      toast.success('Story created successfully!');
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setTextContent('');
      setStoryType('image');
      onOpenChange(false);
      
    } catch (error) {
      toast.error('Failed to create story. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog className="" open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Story</DialogTitle>
        </DialogHeader>

        <Tabs value={storyType} onValueChange={(value) => setStoryType(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="image" className="flex items-center space-x-2">
              <ImageIcon className="h-4 w-4" />
              <span>Photo</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span>Text</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-4">
              {!selectedFile ? (
                <Card className="border-2 border-dashed border-muted-foreground/25 p-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Upload a photo</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose a photo to share with your followers
                      </p>
                    </div>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photo
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="relative">
                  <img
                    src={previewUrl!}
                    alt="Story preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                    className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="space-y-4">
              {!selectedFile ? (
                <Card className="border-2 border-dashed border-muted-foreground/25 p-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Upload a video</h3>
                      <p className="text-sm text-muted-foreground">
                        Share a video moment with your followers
                      </p>
                    </div>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Video
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="relative">
                  <video
                    src={previewUrl!}
                    className="w-full h-64 object-cover rounded-lg"
                    controls
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                    className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your message</label>
                <Textarea
                  placeholder="What's on your mind?"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="min-h-[100px]"
                  maxLength={200}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {textContent.length}/200
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Background color</label>
                <div className="flex space-x-2">
                  {backgroundColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBackgroundColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        backgroundColor === color ? 'border-foreground' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Text size</label>
                <div className="flex space-x-2">
                  {textSizes.map((size) => (
                    <Button
                      key={size.value}
                      variant={textSize === size.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTextSize(size.value)}
                    >
                      {size.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <div 
                  className="w-full h-32 rounded-lg flex items-center justify-center p-4"
                  style={{ backgroundColor }}
                >
                  <p className={`text-white font-bold text-center ${textSize}`}>
                    {textContent || 'Your text will appear here'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateStory}
            disabled={isUploading || (storyType === 'text' && !textContent.trim()) || ((storyType === 'image' || storyType === 'video') && !selectedFile)}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Share Story
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}