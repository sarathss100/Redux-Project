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
import {
  changeRole,
  createUser,
  deleteUser,
  editUser,
  searchUsers,
} from '../controllers/adminController.js';
import { getUsers } from '../controllers/userController.js';
import validateUser from '../utils/validateUser.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/***** User Home Page Routes *****/

router.get('/', homePage);

/***** User Profile Management Routes *****/

router.get('/profile', profilePage);
router.post(
  '/profile/upload-image',
  upload.single('profileImage'),
  uploadProfileImage
);
router.post('/profile/change-password', changePassword);
router.post('/logout', logout);

/***** Admin Authorized Routes *****/

router.put('/update-role/:id', isAdmin, changeRole);
router.get('/getUsers', isAdmin, getUsers);
router.post('/create-user', isAdmin, validateUser, createUser);
router.post('/edit-user/:id', isAdmin, validateUser, editUser);
router.put('/delete-user/:id', isAdmin, deleteUser);
router.get('/search-users', isAdmin, searchUsers);

export default router;
