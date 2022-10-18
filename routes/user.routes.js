import express from 'express';

import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
