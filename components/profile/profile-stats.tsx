'use client';

import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth-store';

export function ProfileStats() {
  const { user } = useAuthStore();

  const stats = [
    {
      label: 'Posts',
      value: '127',
      change: '+12',
    },
    {
      label: 'Followers',
      value: user?.followers?.toLocaleString() || '0',
      change: '+45',
    },
    {
      label: 'Following',
      value: user?.following?.toLocaleString() || '0',
      change: '+3',
    },
    {
      label: 'NFTs',
      value: user?.nfts?.length?.toString() || '0',
      change: '+2',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-green-600">{stat.change} this week</p>
          </div>
        </Card>
      ))}
    </div>
  );
}