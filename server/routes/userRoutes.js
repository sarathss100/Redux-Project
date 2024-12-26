import { getUsers } from '../controllers/userController.js';
import { isAdmin } from '../Middleware/authMiddleware.js';
import homePage from '../controllers/homeController.js';
import validateUser from '../utils/validateUser.js';
import express from 'express';
import multer from 'multer';
const router = express.Router();
import {
  logout,
  profilePage,
  profileImage,
  uploadProfileImage,
  changePassword,
} from '../controllers/userProfileController.js';
import {
  changeRole,
  createUser,
  deleteUser,
  editUser,
  searchUsers,
} from '../controllers/adminController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', homePage);
router.get('/profile', profilePage);
router.get('/profile/image', profileImage);
router.post(
  '/profile/upload-image',
  upload.single('profileImage'),
  uploadProfileImage
);
router.post('/profile/change-password', changePassword);
router.post('/logout', logout);
router.get('/getUsers', isAdmin, getUsers);
router.post('/create-user', isAdmin, validateUser, createUser);
router.post('/edit-user/:id', isAdmin, validateUser, editUser);
router.put('/delete-user/:id', isAdmin, deleteUser);
router.get('/search-users', isAdmin, searchUsers);

export default router;
