import { Router } from 'express';
import { getUserProfile, getAllUsers, updateUserProfile, deleteUserAccount } from '../controllers/users.controller';
import requireAuth from '../middleware/auth.middleware';

const router = Router();

// Route to get all users
router.get('/', getAllUsers);

// Route to get user profile by ID
router.get('/:id', getUserProfile);

// Route to update user profile (authenticated)
router.put('/:id', requireAuth, updateUserProfile);

// Route to delete user account
router.delete('/:id', requireAuth, deleteUserAccount);

export default router;