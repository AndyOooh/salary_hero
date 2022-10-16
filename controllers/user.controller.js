import bcrypt from 'bcrypt';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, SH_COMPANY_ID } from '../config/VARS.js';
import { Company } from '../models/company.model.js';

import { User } from '../models/user.model.js';
import { generateToken } from '../services/token.service.js';

export const getAllusers = async (req, res, next) => {
  const { query } = req.body; // example: { name: 'John' } or { name: 'John', age: 30 }
  try {
    const users = await User.findAll({ ...query });
    res.status(200).json({ message: 'All users retrieved.', data: users });
  } catch (error) {
    return res.status(400).json({ message: 'An error occured. Users not retrieved', data: error });
  }
};

export const createUser = async (req, res, next) => {
  const { first_name, last_name, email, password, companyId } = req.body;
  console.log('🚀 ~ file: user.controller.js ~ line 21 ~ companyId', companyId);

  if (password.trim().length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(400).json({ message: 'No company exists with the provided id' });
    }

    const encryptedPassword = await bcrypt.hash(password, 8);
    const newRefreshToken = generateToken({ email }, REFRESH_TOKEN_SECRET, '7d');

    // const user = await User.create({
    const user = await company.createUser({
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
      { id: user.id, access: user.access, company },
      ACCESS_TOKEN_SECRET,
      '12h'
    );

    res
      .status(200)
      .json({ message: 'User created.', data: { ...user.toJSON(), accessToken: newAccessToken } });
  } catch (error) {
    return res.status(400).json({ message: 'An error occured. User not created', data: error });
  }
};

export const getUser = async (req, res, next) => {
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

// Might be out of scope for the assignment.
export const updateUser = async (req, res, next) => {
  const { id: userId } = req.params;
  res.status(200).json({ message: 'User updated.' });
};

export const deleteUser = async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  await user.destroy();
  res.status(200).json({ message: `User with id: ${userId} deleted.` });
};
