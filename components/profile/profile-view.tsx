'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ProfileHeader } from './profile-header';
import { ProfileStats } from './profile-stats';
import { ProfileTabs } from './profile-tabs';

export function ProfileView() {
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader />
          <div className="px-4 space-y-6">
            <ProfileStats />
            <ProfileTabs />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}