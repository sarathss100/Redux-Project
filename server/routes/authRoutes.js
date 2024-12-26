import { registerUser, loginUser } from '../controllers/authController.js';
import validateUser from '../utils/validateUser.js';
import express from 'express';
const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);

export default router;
