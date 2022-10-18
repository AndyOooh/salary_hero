import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../models/user.model.js';
import { generateToken } from '../services/token.service.js';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/VARS.js';
import { Company } from '../models/company.model.js';

// ---------------------------------------- /refresh ----------------------------------------
// @desc Refresh user access token
// @route GET /api/refresh
// Need refresh_token cookie
export const refreshTokens = async (req, res) => {
  const { refresh_token } = req.cookies;
  if (!refresh_token) return res.sendStatus(401);
  res.clearCookie('refresh_token', {
    httpOnly: true,
  });

  try {
    const decodedToken = await jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);
    if (!decodedToken) return res.sendStatus(401).message('Invalid token');
    const user = await User.findByPk(decodedToken.id);
    const newRefreshToken = generateToken({ email: user.email }, REFRESH_TOKEN_SECRET, '7d');
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
    });
    user.refresh_token = newRefreshToken;
    await user.save();

    const company = Company.findByPk(user.company);
    const newAccessToken = generateToken(
      { id: user.id, access: user.access, company },
      ACCESS_TOKEN_SECRET,
      '12h'
    );
    res.status(200).json({ message: 'Token refresh successfull.', accessToken: newAccessToken });
  } catch (error) {
    console.log('🚀 ~ file: auth.controller.js ~ line 37 ~ error', error);
    res.status(500).json({ message: 'Something went wrong.', error: error });
  }
};

// ---------------------------------------- /login ----------------------------------------
// @desc Log user in
// @route POST /api/login
// @access Public
export const login = async (req, res, next) => {
  const { email, password: loginPassword } = req.body;
  if (!email || !loginPassword) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const { password, refresh_token, ...userJson } = user.toJSON();

    const passwordMatch = await bcrypt.compare(loginPassword, password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const newRefreshToken = generateToken({ email }, REFRESH_TOKEN_SECRET, '7d');
    user.refresh_token = newRefreshToken;
    await user.save();
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
    });

    const { id, access, companyId } = user;
    const company = Company.findByPk(companyId);
    const newAccessToken = generateToken({ id, access, company }, ACCESS_TOKEN_SECRET, '12h');

    res.status(200).json({
      message: 'Login successful',
      data: { ...userJson, accessToken: newAccessToken },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', data: error });
  }
};

// ---------------------------------------- /logout ----------------------------------------
// @desc Log a user out
// @route POST /api/logout
// Need refresh_token cookie
export const logout = async (req, res) => {
  const { refresh_token } = req.cookies;
  if (!refresh_token) return res.sendStatus(204); //No content

  try {
    const existingUser = await User.findOne({ where: { refresh_token } });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }
    existingUser.refresh_token = null;
    await existingUser.save();

    console.log('sending response...');
    res.clearCookie('refresh_token', { httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', data: error });
  }
};
