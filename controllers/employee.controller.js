import bcrypt from 'bcrypt';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, SH_COMPANY_ID } from '../config/VARS.js';
import { Company } from '../models/company.model.js';

import { Employee } from '../models/employee.model.js';
import { generateToken } from '../services/token.service.js';

export const getAllEmployees = async (req, res, next) => {
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
  const { first_name, last_name, email, salaray, position } = req.body;
  console.log('🚀 ~ file: employee.controller.js ~ line 20 ~ salaray', salaray);

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(400).json({ message: 'No company exists with the provided id' });
    }

    const encryptedPassword = await bcrypt.hash(password, 8);
    const newRefreshToken = generateToken({ email }, REFRESH_TOKEN_SECRET, '7d');

    // const employee = await Employee.create({
    const employee = await company.createEmployee({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
      access: companyId !== SH_COMPANY_ID ? 'clientAdmin' : 'shAdmin',
      refresh_token: newRefreshToken,
    });

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
    });

    const newAccessToken = generateToken(
      { id: employee.id, access: employee.access, company },
      ACCESS_TOKEN_SECRET,
      '12h'
    );

    res
      .status(200)
      .json({
        message: 'Employee created.',
        data: { ...employee.toJSON(), accessToken: newAccessToken },
      });
  } catch (error) {
    return res.status(400).json({ message: 'An error occured. Employee not created', data: error });
  }
};

export const getEmployee = async (req, res, next) => {
  const { id: employeeId } = req.params;

  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json({ message: 'Employee retrieved.', data: { ...employee.toJSON() } });
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
      return res.status(404).json({ message: 'Employee not found.' });
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
  res.status(200).json({ message: 'Employee updated.' });
};

export const deleteEmployee = async (req, res, next) => {
  const { id: employeeId } = req.params;
  const employee = await Employee.findByPk(employeeId);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found.' });
  }
  await employee.destroy();
  res.status(200).json({ message: `Employee with id: ${employeeId} deleted.` });
};
