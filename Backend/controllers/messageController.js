import Message from '../models/Message.js';
import Chat from '../models/Chat.js';
import { getIO } from '../config/socket.js';

// @desc    Send message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;

        if (!chatId || !content) {
            return res.status(400).json({
                success: false,
                message: 'Chat ID and content are required',
            });
        }

        // Verify chat exists and user is participant
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        const isParticipant = chat.participants.some(
            (participant) => participant.toString() === req.user._id.toString()
        );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to send messages in this chat',
            });
        }

        // Create message
        const message = await Message.create({
            chat: chatId,
            sender: req.user._id,
            content,
        });

        // Populate sender info
        const populatedMessage = await Message.findById(message._id).populate(
            'sender',
            'username avatar'
        );

        // Update chat's last message
        chat.lastMessage = message._id;
        chat.updatedAt = new Date();
        await chat.save();

        // Emit message via Socket.IO
        const io = getIO();
        io.to(chatId).emit('message:receive', populatedMessage);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: {
                message: populatedMessage,
            },
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error sending message',
        });
    }
};

// @desc    Get messages for a chat
// @route   GET /api/messages/:chatId
// @access  Private
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        // Verify chat exists and user is participant
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        const isParticipant = chat.participants.some(
            (participant) => participant.toString() === req.user._id.toString()
        );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view messages in this chat',
            });
        }

        // Get messages with pagination
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'username avatar')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const totalMessages = await Message.countDocuments({ chat: chatId });

        res.status(200).json({
            success: true,
            data: {
                messages: messages.reverse(), // Reverse to show oldest first
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalMessages / limit),
                    totalMessages,
                },
            },
        });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching messages',
        });
    }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found',
            });
        }

        // Only the receiver can mark as read
        if (message.sender.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot mark your own message as read',
            });
        }

        message.isRead = true;
        message.readAt = new Date();
        await message.save();

        // Emit read status via Socket.IO
        const io = getIO();
        io.to(message.chat.toString()).emit('message:read', {
            messageId: message._id,
            readAt: message.readAt,
        });

        res.status(200).json({
            success: true,
            message: 'Message marked as read',
            data: {
                message,
            },
        });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error marking message as read',
        });
    }
};
