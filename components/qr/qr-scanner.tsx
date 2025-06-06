'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff } from 'lucide-react';

interface QRScannerProps {
  onResult: (result: string) => void;
}

export function QRScanner({ onResult }: QRScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScanning = async () => {
    if (!scannerRef.current) return;

    try {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        'qr-scanner',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      html5QrcodeScanner.render(
        (decodedText) => {
          onResult(decodedText);
          stopScanning();
        },
        (error) => {
          // Handle scan errors silently - they're usually just "no QR code found"
        }
      );

      setScanner(html5QrcodeScanner);
      setIsScanning(true);
      setError(null);
    } catch (err) {
      setError('Failed to start camera. Please check permissions.');
      console.error('QR Scanner error:', err);
    }
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear().catch(console.error);
      setScanner(null);
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div 
        id="qr-scanner" 
        ref={scannerRef}
        className="w-full"
        style={{ minHeight: isScanning ? '300px' : '0px' }}
      />
      
      {error && (
        <div className="text-center text-sm text-destructive p-4 bg-destructive/10 rounded-lg">
          {error}
        </div>
      )}
      
      {!isScanning && !error && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Camera className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Ready to scan QR codes
          </p>
        </div>
      )}
      
      <div className="flex justify-center">
        {!isScanning ? (
          <Button onClick={startScanning} className="w-full">
            <Camera className="h-4 w-4 mr-2" />
            Start Scanning
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="outline" className="w-full">
            <CameraOff className="h-4 w-4 mr-2" />
            Stop Scanning
          </Button>
        )}
      </div>
    </div>
  );
}