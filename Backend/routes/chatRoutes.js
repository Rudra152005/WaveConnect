import express from 'express';
import {
    createChat,
    createGroupChat,
    renameGroupChat,
    getUserChats,
    getChatById,
    deleteChat,
} from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createChat);
router.post('/group', protect, createGroupChat);
router.put('/rename', protect, renameGroupChat);
router.get('/', protect, getUserChats);
router.get('/:id', protect, getChatById);
router.delete('/:id', protect, deleteChat);

export default router;
