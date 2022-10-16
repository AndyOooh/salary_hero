import { DataTypes } from 'sequelize';

import sequelize from '../config/databaseConnect.js';

export const Company = sequelize.define('company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // for identifying the company IRL.
  registration_number: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  size: {
    type: DataTypes.ENUM(['small', 'medium', 'large']),
  },
});
