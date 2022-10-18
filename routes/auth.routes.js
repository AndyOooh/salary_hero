import express from 'express';
import { login, logout, refreshTokens } from '../controllers/auth.controller.js';

const router = express.Router();

console.log('in auth routes')

router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refreshTokens);

export default router;
