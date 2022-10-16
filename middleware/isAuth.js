import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/VARS.js';
import { errorCreator } from '../services/error.service.js';

export const isAuth = adminType => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('🚀 ~ file: isAuth.js ~ line 8 ~ authHeader', authHeader)
    console.log('🚀 ~ file: isAuth.js ~ line 6 ~ adminType', adminType)
    
    if (!authHeader) {
      // errorCreator('Not Authorized', 401);
      const error = new Error('Not Authorized');
      error.status = 401;
      return next(error);
    }
    try {
      const accessToken = authHeader.split(' ')[1];
      const decodedToken = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
      console.log('🚀 ~ file: isAuth.js ~ line 19 ~ decodedToken', decodedToken)
      const { access } = decodedToken;
      if (access !== adminType && adminType !== 'admin') {
        const error = new Error('Not Authorized');
        error.status = 401;
        return next(error);
      }
      req.user = decodedToken;
      console.log('🚀 isAuth.js, decodedToken.id: ', decodedToken.id);
      next();
    } catch (error) {
      console.log('in isAuth error: ', error);
      return next(error);
    }
  };
};
