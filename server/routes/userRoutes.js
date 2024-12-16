import express from 'express';
import multer from 'multer';
const router = express.Router();
import homePage from '../controllers/homeController.js';
import {
  logout,
  profilePage,
  uploadProfileImage,
  changePassword,
} from '../controllers/userProfileController.js';
import { isAdmin } from '../Middleware/authMiddleware.js';
import { changeRole } from '../controllers/adminController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', homePage);
router.get('/profile', profilePage);
router.post(
  '/uploadProfileImage',
  upload.single('profileImage'),
  uploadProfileImage
);
router.post('/changePassword', changePassword);
router.post('/logout', logout);
router.put('/update-role/:id', isAdmin, changeRole);

export default router;
