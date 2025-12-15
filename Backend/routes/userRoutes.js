import express from 'express';
import {
    getProfile,
    updateProfile,
    uploadAvatar,
    searchUsers,
    getUserById,
    deleteAccount,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteAccount);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);
router.get('/search', protect, searchUsers);
router.get('/:id', protect, getUserById);

export default router;
