import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';

let socket = null;

export const initializeSocket = () => {
    const { accessToken } = useAuthStore.getState();

    if (!accessToken) {
        console.warn('No access token available for socket connection');
        return null;
    }

    socket = io('http://localhost:5000', {
        auth: {
            token: accessToken,
        },
        transports: ['websocket'],
    });

    // Connection events
    socket.on('connect', () => {
        console.log('✅ Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
    });

    // User online/offline events
    socket.on('user:online', ({ userId }) => {
        useChatStore.getState().setUserOnline(userId, true);
    });

    socket.on('user:offline', ({ userId }) => {
        useChatStore.getState().setUserOnline(userId, false);
    });

    // Message events
    socket.on('message:receive', (message) => {
        useChatStore.getState().addMessage(message);

        // Update last message in chat list
        useChatStore.getState().updateChat(message.chat, {
            lastMessage: message,
            updatedAt: new Date(),
        });
    });

    socket.on('message:read', ({ messageId, readAt }) => {
        useChatStore.getState().updateMessage(messageId, {
            isRead: true,
            readAt,
        });
    });

    // Typing events
    socket.on('typing:display', ({ username }) => {
        // Handle typing indicator display
        console.log(`${username} is typing...`);
    });

    socket.on('typing:hide', () => {
        // Handle typing indicator hide
        console.log('User stopped typing');
    });

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => {
    return socket;
};

// Socket event emitters
export const joinChat = (chatId) => {
    if (socket) {
        socket.emit('chat:join', chatId);
    }
};

export const sendMessage = (chatId, message) => {
    if (socket) {
        socket.emit('message:send', { chatId, message });
    }
};

export const startTyping = (chatId, username) => {
    if (socket) {
        socket.emit('typing:start', { chatId, username });
    }
};

export const stopTyping = (chatId) => {
    if (socket) {
        socket.emit('typing:stop', chatId);
    }
};
