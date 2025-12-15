import express from 'express';
import { register, login, refreshToken, logout, socialLogin } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/social-login', socialLogin);
router.post('/refresh', refreshToken);
router.post('/logout', protect, logout);

export default router;
