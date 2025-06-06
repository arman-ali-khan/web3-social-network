'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatList } from './chat-list';
import { ChatWindow } from './chat-window';
import { useChatStore } from '@/store/chat-store';

export function ChatView() {
  const { activeChat } = useChatStore();

  return (
    <div className="h-full flex">
      {/* Chat List */}
      <div className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 border-r`}>
        <ChatList />
      </div>
      
      {/* Chat Window */}
      {activeChat && (
        <div className={`${activeChat ? 'flex' : 'hidden md:flex'} flex-1`}>
          <ChatWindow />
        </div>
      )}
      
      {/* Empty State */}
      {!activeChat && (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
              <span className="text-4xl">💬</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a chat to start messaging</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}