import express from 'express';
import { createCompany, deleteCompany, getAllcompanies, updateCompany } from '../controllers/company.controller.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.route('/', isAuth('shAdmin')).get(getAllcompanies).post(createCompany);
router.route('/:id', isAuth('shAdmin')).get(getAllcompanies).put(updateCompany).delete(deleteCompany);

export default router;