import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'crypto';
  timestamp: Date;
  encrypted?: boolean;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: Date;
}

interface ChatState {
  chats: Chat[];
  messages: { [chatId: string]: ChatMessage[] };
  activeChat: string | null;
  addChat: (chat: Chat) => void;
  addMessage: (chatId: string, message: ChatMessage) => void;
  setActiveChat: (chatId: string | null) => void;
  markAsRead: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  messages: {},
  activeChat: null,
  
  addChat: (chat: Chat) => {
    set((state) => ({
      chats: [...state.chats, chat],
    }));
  },
  
  addMessage: (chatId: string, message: ChatMessage) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    }));
  },
  
  setActiveChat: (chatId: string | null) => {
    set({ activeChat: chatId });
  },
  
  markAsRead: (chatId: string) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ),
    }));
  },
}));