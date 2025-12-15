import User from '../models/User.js';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../utils/generateToken.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        // Check if user already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists',
            });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken',
            });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
        });

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to user
        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: user.getPublicProfile(),
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error registering user',
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Find user and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Check password
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: user.getPublicProfile(),
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error logging in',
        });
    }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required',
            });
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token',
            });
        }

        // Find user and check if refresh token matches
        const user = await User.findById(decoded.userId).select('+refreshToken');

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token',
            });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error refreshing token',
        });
    }
};

// @desc    Social login (Google/GitHub via Firebase)
// @route   POST /api/auth/social-login
// @access  Public
export const socialLogin = async (req, res) => {
    try {
        const { username, email, avatar, firebaseUid } = req.body;

        // Validation
        if (!email || !firebaseUid) {
            return res.status(400).json({
                success: false,
                message: 'Email and Firebase UID are required',
            });
        }

        // Check if user exists by email or firebaseUid
        let user = await User.findOne({ $or: [{ email }, { firebaseUid }] });

        if (!user) {
            // Create new user from social login
            user = await User.create({
                username: username || email.split('@')[0],
                email,
                avatar,
                firebaseUid,
                password: Math.random().toString(36).slice(-12), // Random password (not used)
            });
        } else {
            // Update existing user with Firebase info if not set
            if (!user.firebaseUid) {
                user.firebaseUid = firebaseUid;
            }
            if (avatar && !user.avatar) {
                user.avatar = avatar;
            }
            await user.save();
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Social login successful',
            data: {
                user: user.getPublicProfile(),
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.error('Social login error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error with social login',
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    try {
        // Clear refresh token
        req.user.refreshToken = undefined;
        await req.user.save();

        res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error logging out',
        });
    }
};
