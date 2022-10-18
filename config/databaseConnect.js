import { Sequelize } from 'sequelize';

import { DB_NAME, DB_USER, DB_PASSWORD } from './VARS.js';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
});

export default sequelize;
