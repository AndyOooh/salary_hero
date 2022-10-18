import express from 'express';

import companyRoutes from './company.routes.js';
import userRoutes from './user.routes.js';
import employeeRoutes from './employee.routes.js';
import authRoutes from './auth.routes.js';
import advanceRequestRoutes from './advanceRequest.routes.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/companies', isAuth('shAdmin'), companyRoutes);
router.use('/users', isAuth('shAdmin'), userRoutes);
router.use('/employees', isAuth('admin'), employeeRoutes);
router.use('/advance_requests', isAuth('admin'), advanceRequestRoutes);


export default router;
