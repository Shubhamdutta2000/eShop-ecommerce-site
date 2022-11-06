import express from 'express';

import {
  authUser,
  checkAuth,
  deleteUser,
  emailVerification,
  getUserById,
  getUserProfile,
  getUsers,
  passwordReset,
  registerUser,
  updateUser,
  updateUserProfile
} from '../controllers/userController.js';
import { adminCheck, authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(authProtect, getUserProfile).put(authProtect, updateUserProfile);
router.route('/auth').get(authProtect, checkAuth);

///   FOR ADMIN USER   ///
router.route('/').get(authProtect, adminCheck, getUsers);
router
  .route('/:id')
  .get(authProtect, adminCheck, getUserById)
  .put(authProtect, adminCheck, updateUser)
  .delete(authProtect, adminCheck, deleteUser);

///  FOR RESET PASSWORD  ///
router.route('/email-verify').post(emailVerification);
router.route('/reset-password/:accessToken').post(passwordReset);

export default router;
