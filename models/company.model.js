import { DataTypes } from 'sequelize';

import sequelize from '../config/databaseConnect.js';

export const Company = sequelize.define(
  'company',
  {
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
  },
  {
    // Making sure password, refresh_token is not returned on create, update or save:
    hooks: {
      // afterCreate: record => {
      //   delete record.dataValues.password;
      //   delete record.dataValues.refresh_token;
      // },
      // afterUpdate: record => {
      //   delete record.dataValues.password;
      //   delete record.dataValues.refresh_token;
      // },
      // afterSave: record => {
      //   delete record.dataValues.password;
      //   delete record.dataValues.refresh_token;
      // },

      // Not working as intended. Trying to delete password and refresh_token from the nested user.
      afterFind: record => {
        delete record.dataValues.user?.password;
        delete record.dataValues.user?.refresh_token;
      },
      afterQuery: record => {
        delete record.dataValues.user?.password;
        delete record.dataValues.user?.refresh_token;
      },
    },
  }
);
