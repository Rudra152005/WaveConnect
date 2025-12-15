import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: {
                user: req.user,
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching profile',
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const { username, bio } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (bio !== undefined) updateData.bio = bio;

        // Check if username is already taken by another user
        if (username && username !== req.user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken',
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: updatedUser,
            },
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile',
        });
    }
};

// @desc    Upload user avatar
// @route   POST /api/users/avatar
// @access  Private
export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        // Update user avatar path
        const avatarPath = `/uploads/avatars/${req.file.filename}`;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: avatarPath },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded successfully',
            data: {
                user: updatedUser,
            },
        });
    } catch (error) {
        console.error('Upload avatar error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error uploading avatar',
        });
    }
};

// @desc    Search users
// @route   GET /api/users/search?q=searchTerm
// @access  Private
export const searchUsers = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Search query is required',
            });
        }

        const users = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: q, $options: 'i' } },
                        { email: { $regex: q, $options: 'i' } },
                    ],
                },
                { _id: { $ne: req.user._id } }, // Exclude current user
            ],
        })
            .select('username email avatar bio isOnline lastSeen')
            .limit(20);

        res.status(200).json({
            success: true,
            data: {
                users,
            },
        });
    } catch (error) {
        console.error('Search users error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error searching users',
        });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(
            'username email avatar bio isOnline lastSeen'
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching user',
        });
    }
};

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully',
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting account',
        });
    }
};
