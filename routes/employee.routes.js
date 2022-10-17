import express from 'express';

import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from '../controllers/employee.controller.js';

const router = express.Router();

router.route('/').get(getAllEmployees).post(createEmployee);
router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);

export default router;


// TO do: set isAuth. get('/) = admin, the rest clientAdmin.


