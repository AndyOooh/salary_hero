import { FRONTEND_URL } from './VARS.js';

export const corsConfig = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'Content-Type',
    'Authorization',
  
  ],
};
