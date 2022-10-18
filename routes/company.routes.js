import express from 'express';
import {
  getCompanies,
  createCompany,
  deleteCompany,
  getCompany,
  updateCompany,
} from '../controllers/company.controller.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.route('/', isAuth('shAdmin')).get(getCompanies).post(createCompany);
router.route('/:id', isAuth('shAdmin')).get(getCompany).put(updateCompany).delete(deleteCompany);

export default router;
