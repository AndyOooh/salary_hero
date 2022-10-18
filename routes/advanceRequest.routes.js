import express from 'express';
import { createAdvanceRequest } from '../controllers/advanceRequest.controller.js';



const router = express.Router();

router.route('/').get().post(createAdvanceRequest);
router.route('/:id').get().put().delete();

export default router;
