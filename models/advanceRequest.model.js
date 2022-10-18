import { DataTypes } from 'sequelize';

import sequelize from '../config/databaseConnect.js';

export const AdvanceRequest = sequelize.define(
  'advance_request',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    month: {
      type: DataTypes.ENUM([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]),
      defaultValue: new Date().toLocaleString('default', { month: 'long' }),
    },
    year: {
      type: DataTypes.STRING,
      defaultValue: new Date().toLocaleString('default', { year: 'numeric' }),
    },
    request_date: { type: DataTypes.DATEONLY, defaultValue: Date.now() },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM(['pending', 'approved', 'rejected']), defaultValue: 'pending' },
    reason: { type: DataTypes.STRING },
  },
  {
    // Make sure months start with upperCase.
    hooks: {
      beforeCreate: advanceRequest => {
        advanceRequest.month =
          advanceRequest.month.charAt(0).toUpperCase() + advanceRequest.month.slice(1);
      },
    },
  }
);
