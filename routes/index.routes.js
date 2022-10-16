import express from 'express';

import companyRoutes from './company.routes.js';
import userRoutes from './user.routes.js';
import employeeRoutes from './employee.routes.js';
import authRoutes from './auth.routes.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

console.log('in index.routes');

router.use('/auth', authRoutes);
router.use('/company', isAuth('shAdmin'), companyRoutes);
// router.use('/user', isAuth('shAdmin'), userRoutes);
router.use('/user', userRoutes);
router.use('/employee', employeeRoutes);

export default router;
