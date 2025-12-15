import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

// @desc    Create or get existing chat
// @route   POST /api/chats
// @access  Private
export const createChat = async (req, res) => {
    try {
        const { participantId } = req.body;

        if (!participantId) {
            return res.status(400).json({
                success: false,
                message: 'Participant ID is required',
            });
        }

        // Check if chat already exists
        const existingChat = await Chat.findOne({
            participants: { $all: [req.user._id, participantId] },
        })
            .populate('participants', 'username email avatar isOnline lastSeen')
            .populate({
                path: 'lastMessage',
                populate: { path: 'sender', select: 'username avatar' },
            });

        if (existingChat) {
            return res.status(200).json({
                success: true,
                message: 'Chat already exists',
                data: {
                    chat: existingChat,
                },
            });
        }

        // Create new chat
        const chat = await Chat.create({
            participants: [req.user._id, participantId],
        });

        const populatedChat = await Chat.findById(chat._id).populate(
            'participants',
            'username email avatar isOnline lastSeen'
        );

        res.status(201).json({
            success: true,
            message: 'Chat created successfully',
            data: {
                chat: populatedChat,
            },
        });
    } catch (error) {
        console.error('Create chat error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating chat',
        });
    }
};

// @desc    Create new group chat
// @route   POST /api/chats/group
// @access  Private
export const createGroupChat = async (req, res) => {
    try {
        const { participants, name } = req.body;

        if (!participants || !name) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields',
            });
        }

        // Parse participants if strict JSON string
        let users = participants;
        if (typeof participants === 'string') {
            users = JSON.parse(participants);
        }

        if (users.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'More than 2 users are required to form a group chat',
            });
        }

        users.push(req.user._id);

        const groupChat = await Chat.create({
            chatName: name,
            participants: users,
            isGroupChat: true,
            groupAdmin: req.user._id,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('participants', '-password')
            .populate('groupAdmin', '-password');

        res.status(200).json({
            success: true,
            data: {
                chat: fullGroupChat,
            },
        });
    } catch (error) {
        console.error('Create group chat error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating group chat',
        });
    }
};

// @desc    Rename group chat
// @route   PUT /api/chats/rename
// @access  Private
export const renameGroupChat = async (req, res) => {
    try {
        const { chatId, chatName } = req.body;

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatName },
            { new: true }
        )
            .populate('participants', '-password')
            .populate('groupAdmin', '-password');

        if (!updatedChat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                chat: updatedChat,
            },
        });
    } catch (error) {
        console.error('Rename group chat error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error renaming group chat',
        });
    }
};

// @desc    Get all user chats
// @route   GET /api/chats
// @access  Private
export const getUserChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            participants: req.user._id,
        })
            .populate('participants', 'username email avatar isOnline lastSeen')
            .populate({
                path: 'lastMessage',
                populate: { path: 'sender', select: 'username avatar' },
            })
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            data: {
                chats,
            },
        });
    } catch (error) {
        console.error('Get chats error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching chats',
        });
    }
};

// @desc    Get chat by ID
// @route   GET /api/chats/:id
// @access  Private
export const getChatById = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
            .populate('participants', 'username email avatar isOnline lastSeen')
            .populate({
                path: 'lastMessage',
                populate: { path: 'sender', select: 'username avatar' },
            });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        // Check if user is participant
        const isParticipant = chat.participants.some(
            (participant) => participant._id.toString() === req.user._id.toString()
        );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this chat',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                chat,
            },
        });
    } catch (error) {
        console.error('Get chat error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching chat',
        });
    }
};

// @desc    Delete chat
// @route   DELETE /api/chats/:id
// @access  Private
export const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        // Check if user is participant
        const isParticipant = chat.participants.some(
            (participant) => participant.toString() === req.user._id.toString()
        );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this chat',
            });
        }

        // Delete all messages in the chat
        await Message.deleteMany({ chat: chat._id });

        // Delete the chat
        await Chat.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Chat deleted successfully',
        });
    } catch (error) {
        console.error('Delete chat error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting chat',
        });
    }
};
