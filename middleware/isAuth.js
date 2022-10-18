import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, NODE_ENV } from '../config/VARS.js';

export const isAuth = adminType => {
  return async (req, res, next) => {
    if (NODE_ENV === 'initial') return next();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'Not Authorized' });
    }
    try {
      const accessToken = authHeader.split(' ')[1];
      const decodedToken = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
      console.log('🚀 ~ file: isAuth.js ~ line 19 ~ decodedToken', decodedToken);
      const { access } = decodedToken;
      if (access !== adminType && adminType !== 'admin') {
        return res.status(401).json({ message: 'Not Authorized' });
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log('in isAuth error: ', error);
      res.status(401).json({ message: 'Not Authorized', data: error });
    }
  };
};
