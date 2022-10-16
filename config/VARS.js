import 'dotenv/config';

export const {
  NODE_ENV,
  PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  DB_NAME_DEV,
  DB_NAME_PROD,
  DB_USER,
  DB_PASSWORD,
  SH_COMPANY_ID,
  SH_REG_NUMBER,

  FRONTEND_URL_PROD,
  FRONTEND_URL_DEV,
} = process.env;

export const DB_NAME = NODE_ENV === 'production' ? DB_NAME_PROD : DB_NAME_DEV;
export const LOG_SETTING = NODE_ENV === 'production' ? 'combined' : 'dev';

export const FRONTEND_URL = NODE_ENV === 'production' ? FRONTEND_URL_PROD : FRONTEND_URL_DEV;
