import { SH_COMPANY_ID } from '../config/VARS.js';
import { Company } from '../models/company.model.js';
import { Employee } from '../models/employee.model.js';

// ---------------------------------------- getEmployees ----------------------------------------
// @desc get an array of empployees matching a speficied query.
// @route GET /api/empployees
export const getEmployees = async (req, res, next) => {
  const { query } = req.body;

  try {
    const employees = await Employee.findAll({ ...query });
    res.status(200).json({ message: 'All employees retrieved.', data: employees });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured. Employees not retrieved', data: error });
  }
};

// ---------------------------------------- createEmployee ----------------------------------------
// @desc create an employee.
// @route POST /api/employees
export const createEmployee = async (req, res) => {
  const { first_name, last_name, email, salary, position, companyId: inputCompanyId } = req.body;
  const userCompanyId = req.user.company.id.toString();

  if (inputCompanyId && ![SH_COMPANY_ID, inputCompanyId].includes(userCompanyId)) {
    return res.status(400).json({ message: 'You can not register employees for other companies' });
  }

  if (!inputCompanyId && userCompanyId === SH_COMPANY_ID) {
    return res.status(400).json({ message: 'No company id provided' });
  }

  const companyId = inputCompanyId || userCompanyId;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(400).json({ message: 'No company exists with the provided id' });
    }
    const employee = await company.createEmployee({
      first_name,
      last_name,
      email,
      salary,
      position,
    });
    res.status(201).json({
      message: `Employee ${employee.full_name} created with id: ${employee.id}`,
      data: { ...employee.toJSON() },
    });
  } catch (error) {
    console.log('🚀 ~ file: employee.controller.js ~ line 78 ~ error', error);
    return res.status(400).json({ message: 'An error occured. Employee not created', data: error });
  }
};

// ---------------------------------------- getEmployee ----------------------------------------
// @desc get an employee matching an employeeId.
// @route GET /api/employees/:id
export const getEmployee = async (req, res, next) => {
  const { id: employeeId } = req.params;
  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee retrieved', data: { ...employee.toJSON() } });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occured. Employee not retrieved', data: error });
  }
};

// ---------------------------------------- updateEmployee ----------------------------------------
// @desc update an employee matching an employeeId.
// @route PUT /api/employees/:id
export const updateEmployee = async (req, res) => {
  const { id: employeeId } = req.params;
  const { first_name, last_name, email, salaray, position } = req.body;

  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.first_name = first_name || employee.first_name;
    employee.last_name = last_name || employee.last_name;
    employee.email = email || employee.email;
    employee.salaray = salaray || employee.salaray;
    employee.position = position || employee.position;

    await employee.save();
    res.status(201).json({
      message: `Employee ${employee.full_name} with id: ${employee.id} updated.`,
      data: { ...employee.toJSON() },
    });
  } catch (error) {
    res.status(400).json({ message: 'An error occured. Employee not updated', data: error });
  }
};

// ---------------------------------------- deleteEmployee ----------------------------------------
// @desc delete an employee matching an employeeId.
// @route DELETE /api/employees/:id
export const deleteEmployee = async (req, res, next) => {
  const { id: employeeId } = req.params;
  const employee = await Employee.findByPk(employeeId);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  await employee.destroy();
  res.status(200).json({ message: `Employee with id: ${employeeId} deleted` });
};
