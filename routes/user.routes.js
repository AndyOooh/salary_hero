import express from 'express';

import {
  createUser,
  deleteUser,
  getAllusers,
  getUser,
  updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllusers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
