import express from 'express';
const router = express.Router();
import validateUser from '../utils/validateUser.js';
import { registerUser, loginUser } from '../controllers/authController.js';

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
// router.post('/refresh-token', refreshAccessToken);

export default router;
