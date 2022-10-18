import bcrypt from 'bcrypt';

import { NODE_ENV, SH_COMPANY_ID } from '../config/VARS.js';
import { Company } from '../models/company.model.js';
import { User } from '../models/user.model.js';

// ---------------------------------------- getUsers ----------------------------------------
// @desc get an array of users matching a speficied query.
// @route GET /api/users
export const getUsers = async (req, res) => {
  const { query } = req.body; // example: { first_name: 'John' } or { companyId: 254 }
  try {
    const users = await User.findAll({ ...query });
    res.status(200).json({ message: 'Users retrieved.', data: users });
  } catch (error) {
    return res.status(400).json({ message: 'An error occured. Users not retrieved', data: error });
  }
};

// ---------------------------------------- createUser ----------------------------------------
// @desc create a user.
// @route POST /api/users
export const createUser = async (req, res) => {
  const { first_name, last_name, email, password, companyId } = req.body;
  if (NODE_ENV !== 'initial' && (password.trim().length < 8 || password.trim().length > 48)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(400).json({ message: 'Company not found' });
    }
    const encryptedPassword = await bcrypt.hash(password, 8);
    const user = await company.createUser({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
      access: companyId !== SH_COMPANY_ID ? 'clientAdmin' : 'shAdmin',
    });

    res.status(201).json({
      message: `User ${user.full_name} created with id: ${user.id}`,
      data: { ...user.toJSON() },
    });
  } catch (error) {
    res.status(400).json({ message: 'An error occured. User not created', data: error });
  }
};

// ---------------------------------------- getUser ----------------------------------------
// @desc get a user.
// @route GET /api/users/:id
export const getUser = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User retrieved.', data: { ...user.toJSON() } });
  } catch (error) {
    return res.status(400).json({ message: 'An error occured. User not retrieved', data: error });
  }
};

// ---------------------------------------- updateUser ----------------------------------------
// @desc update a user.
// @route PUT /api/users/:id
export const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  res.status(200).json({ message: 'User updated.' });
};

// ---------------------------------------- deleteUser ----------------------------------------
// @desc delete a user.
// @route DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  await user.destroy();
  res.status(200).json({ message: `User with id: ${userId} deleted.` });
};
