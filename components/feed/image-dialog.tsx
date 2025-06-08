'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share, 
  Heart,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react';

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  initialIndex?: number;
}

export function ImageDialog({ open, onOpenChange, images, initialIndex = 0 }: ImageDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    resetTransforms();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    resetTransforms();
  };

  const resetTransforms = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(images[currentIndex]);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shared Image',
          url: images[currentIndex],
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(images[currentIndex]);
        // You could show a toast here
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Escape':
        onOpenChange(false);
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case 'r':
      case 'R':
        handleRotate();
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-full h-full p-0 bg-black/95 border-none"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-white bg-black/50">
                {currentIndex + 1} / {images.length}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="text-white hover:bg-white/20"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="text-white hover:bg-white/20"
                disabled={zoom >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRotate}
                className="text-white hover:bg-white/20"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-white hover:bg-white/20"
              >
                <Share className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Heart className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Main Image */}
          <div className="w-full h-full flex items-center justify-center p-16">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-300"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
              draggable={false}
            />
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center space-x-2 bg-black/50 rounded-lg p-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      resetTransforms();
                    }}
                    className={`w-12 h-12 rounded overflow-hidden border-2 transition-colors ${
                      index === currentIndex 
                        ? 'border-white' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Zoom Indicator */}
          {zoom !== 1 && (
            <div className="absolute bottom-4 right-4 z-20">
              <Badge variant="secondary" className="text-white bg-black/50">
                {Math.round(zoom * 100)}%
              </Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}