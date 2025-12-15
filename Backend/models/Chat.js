import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        chatName: {
            type: String,
            trim: true,
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
chatSchema.index({ participants: 1 });
chatSchema.index({ updatedAt: -1 });

// Ensure only 2 participants for one-to-one chat
chatSchema.pre('save', function (next) {
    if (!this.isGroupChat && this.participants.length !== 2) {
        return next(new Error('One-to-one chat must have exactly 2 participants'));
    }
    next();
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
