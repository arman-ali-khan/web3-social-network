'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Send, 
  Download, 
  Repeat, 
  QrCode,
  CreditCard,
  ArrowUpDown
} from 'lucide-react';

const actions = [
  {
    icon: Send,
    label: 'Send',
    description: 'Transfer crypto',
    color: 'text-blue-500',
  },
  {
    icon: Download,
    label: 'Receive',
    description: 'Get crypto',
    color: 'text-green-500',
  },
  {
    icon: ArrowUpDown,
    label: 'Swap',
    description: 'Exchange tokens',
    color: 'text-purple-500',
  },
  {
    icon: CreditCard,
    label: 'Buy',
    description: 'Purchase crypto',
    color: 'text-orange-500',
  },
  {
    icon: QrCode,
    label: 'Scan',
    description: 'QR payments',
    color: 'text-teal-500',
  },
  {
    icon: Repeat,
    label: 'History',
    description: 'View transactions',
    color: 'text-gray-500',
  },
];

export function QuickActions() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            className="flex flex-col space-y-2 h-auto p-4 hover:bg-muted/50"
          >
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${action.color}`}>
              <action.icon className="h-4 w-4" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}