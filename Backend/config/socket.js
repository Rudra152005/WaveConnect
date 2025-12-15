import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

let io;
const userSockets = new Map(); // Map userId to socketId

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    // Middleware to authenticate socket connections
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            socket.userId = decoded.userId;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', async (socket) => {
        console.log(`🔌 User connected: ${socket.userId}`);

        // Store socket connection
        userSockets.set(socket.userId, socket.id);

        // Update user online status
        await User.findByIdAndUpdate(socket.userId, {
            isOnline: true,
            lastSeen: new Date(),
        });

        // Broadcast online status
        socket.broadcast.emit('user:online', { userId: socket.userId });

        // Join user to their personal room
        socket.join(socket.userId);

        // Handle joining chat rooms
        socket.on('chat:join', (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.userId} joined chat ${chatId}`);
        });

        // Handle sending messages
        socket.on('message:send', (data) => {
            const { chatId, message } = data;
            // Broadcast to all users in the chat room except sender
            socket.to(chatId).emit('message:receive', message);
        });

        // Handle typing indicator
        socket.on('typing:start', (data) => {
            const { chatId, username } = data;
            socket.to(chatId).emit('typing:display', { username });
        });

        socket.on('typing:stop', (chatId) => {
            socket.to(chatId).emit('typing:hide');
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log(`❌ User disconnected: ${socket.userId}`);

            // Remove socket connection
            userSockets.delete(socket.userId);

            // Update user offline status
            await User.findByIdAndUpdate(socket.userId, {
                isOnline: false,
                lastSeen: new Date(),
            });

            // Broadcast offline status
            socket.broadcast.emit('user:offline', { userId: socket.userId });
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

export const getUserSocket = (userId) => {
    return userSockets.get(userId);
};
