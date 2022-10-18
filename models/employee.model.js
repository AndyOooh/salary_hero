import { DataTypes } from 'sequelize';

import sequelize from '../config/databaseConnect.js';

export const Employee = sequelize.define(
  'employee',
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
    // full_name is a virtul property, ie. not stored in the database.
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
      validate: { isEmail: { args: true, msg: 'You must use a valid email address.' } },
    },
    salary: {
      type: DataTypes.INTEGER,
    },
    position: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: employee => {
        employee.email = employee.email.toLowerCase();
        employee.position = employee.position.charAt(0).toUpperCase() + employee.position.slice(1);
        employee.first_name =
          employee.first_name.charAt(0).toUpperCase() + employee.first_name.slice(1);
        employee.last_name =
          employee.last_name.charAt(0).toUpperCase() + employee.last_name.slice(1);
      },
    },
  }
);
