import { DataTypes } from 'sequelize';

import sequelize from '../config/databaseConnect.js';

export const Employee = sequelize.define('employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: { args: true, msg: 'You must use a valid email address.' } },
  },
  salaray: {
    type: DataTypes.INTEGER,
  },
  position: {
    type: DataTypes.STRING,
  },
  // advanceRequests: {
  //   type: [
  //     {
  //       month: { type: DataTypes.STRING, default: new Date().getMonth() },
  //       year: { type: DataTypes.STRING, default: new Date().getFullYear() },
  //       requestdate: { type: DataTypes.DATEONLY, default: Date.now() },
  //       amount: DataTypes.INTEGER,
  //       status: DataTypes.ENUM(['pending', 'approved', 'rejected']),
  //     },
  //   ],
  // },
});
