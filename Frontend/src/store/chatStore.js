import { create } from 'zustand';

export const useChatStore = create((set) => ({
    chats: [],
    activeChat: null,
    messages: [],
    typingUsers: new Set(),
    onlineUsers: new Set(),

    setChats: (chats) => set({ chats }),

    addChat: (chat) =>
        set((state) => ({
            chats: [chat, ...state.chats],
        })),

    updateChat: (chatId, updates) =>
        set((state) => ({
            chats: state.chats.map((chat) =>
                chat._id === chatId ? { ...chat, ...updates } : chat
            ),
        })),

    setActiveChat: (chat) =>
        set({ activeChat: chat, messages: [] }),

    setMessages: (messages) => set({ messages }),

    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),

    updateMessage: (messageId, updates) =>
        set((state) => ({
            messages: state.messages.map((msg) =>
                msg._id === messageId ? { ...msg, ...updates } : msg
            ),
        })),

    setTyping: (userId, isTyping) =>
        set((state) => {
            const typingUsers = new Set(state.typingUsers);
            if (isTyping) {
                typingUsers.add(userId);
            } else {
                typingUsers.delete(userId);
            }
            return { typingUsers };
        }),

    setUserOnline: (userId, isOnline) =>
        set((state) => {
            const onlineUsers = new Set(state.onlineUsers);
            if (isOnline) {
                onlineUsers.add(userId);
            } else {
                onlineUsers.delete(userId);
            }
            return { onlineUsers };
        }),

    clearChat: () =>
        set({
            activeChat: null,
            messages: [],
        }),
}));
