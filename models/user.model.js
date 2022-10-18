import { DataTypes } from 'sequelize';

import sequelize from '../config/databaseConnect.js';

export const User = sequelize.define(
  'user',
  {
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
    full_name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.first_name} ${this.last_name}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { args: true, msg: 'You must use a valid email address.' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'You must set a password.' },
    },
    refresh_token: { type: DataTypes.STRING },
    // access is redundant as we could use companyId instead but it's kept for ease of reading/understanding.
    access: {
      type: DataTypes.ENUM(['clientAdmin', 'shAdmin']),
      allowNull: false,
    },
  },
  {
    // Making sure password, refresh_token is not returned on create, update or save:
    hooks: {
      beforeCreate: user => {
        user.email = user.email.toLowerCase();
      },
      afterCreate: record => {
        delete record.dataValues.password;
        delete record.dataValues.refresh_token;
      },
      afterUpdate: record => {
        delete record.dataValues.password;
        delete record.dataValues.refresh_token;
      },
      afterSave: record => {
        delete record.dataValues.password;
        delete record.dataValues.refresh_token;
      },
      afterFind: record => {
        // delete record.dataValues.password;
        // delete record.dataValues.refresh_token;
      },
    },
  }
);
