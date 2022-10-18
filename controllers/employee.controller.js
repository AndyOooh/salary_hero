import {  SH_COMPANY_ID } from '../config/VARS.js';
import { Company } from '../models/company.model.js';

import { Employee } from '../models/employee.model.js';

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


export const createEmployee = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    salary,
    position,
    advanceRequests,
    companyId: inputCompanyId,
  } = req.body;
  console.log('🚀 ~ file: employee.controller.js ~ line 20 ~ salary', salary);

  const userCompanyId = req.user.company.id;
  console.log('🚀 ~ file: employee.controller.js ~ line 25 ~ userCompanyId', userCompanyId);

  if (inputCompanyId && userCompanyId !== SH_COMPANY_ID) {
    return res
      .status(400)
      .json({ message: 'You are not allowed to create employees for other companies' });
  }

  if (!inputCompanyId && userCompanyId === SH_COMPANY_ID) {
    return res.status(400).json({ message: 'No company id provided' });
  }

  const companyId = inputCompanyId || userCompanyId;

  try {
    const company = await Company.findByPk(companyId);
    console.log('🚀 ~ file: employee.controller.js ~ line 47 ~ company', company);

    if (!company) {
      return res.status(400).json({ message: 'No company exists with the provided id' });
    }

    // const employee = await Employee.create({
    const employee = await company.createEmployee({
      first_name,
      last_name,
      email,
      salary,
      position,
      // advanceRequests,
    });

    res.status(200).json({
      message: 'Employee created.',
      data: { ...employee.toJSON() },
    });
  } catch (error) {
    console.log('🚀 ~ file: employee.controller.js ~ line 78 ~ error', error);
    return res.status(400).json({ message: 'An error occured. Employee not created', data: error });
  }
};

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

export const createAdvanceRequest = async (req, res, next) => {
  const { id: employeeId } = req.params;
  const { amount, reason, month, year } = req.body;

  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const advanceRequest = {
      amount,
      reason,
      month,
      year,
    };
  } catch (error) {}
};

// Might be out of scope for the assignment.
export const updateEmployee = async (req, res, next) => {
  const { id: employeeId } = req.params;
  res.status(200).json({ message: 'Employee updated' });
};

export const deleteEmployee = async (req, res, next) => {
  const { id: employeeId } = req.params;
  const employee = await Employee.findByPk(employeeId);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  await employee.destroy();
  res.status(200).json({ message: `Employee with id: ${employeeId} deleted` });
};
