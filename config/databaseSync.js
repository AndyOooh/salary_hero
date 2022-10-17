import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Employee } from '../models/employee.model.js';
import sequelize from './databaseConnect.js';
import { NODE_ENV, SH_REG_NUMBER } from './VARS.js';

// setting up model/table relations for benefits such as auto foreign_ids
Employee.belongsTo(Company, { constraints: true, onDelete: 'CASCADE' });
Company.hasMany(Employee);
User.belongsTo(Company, { constraints: true, onDelete: 'CASCADE' });
Company.hasMany(User);

// {force: true} is for development only. It will drop all tables and recreate them.
export const databaseSync = async (req, res, next) => {
  try {
    if (NODE_ENV === 'initial') {
      await sequelize.sync({ force: true });
      const company = await Company.create({
        name: 'Salary Hero',
        registration_number: SH_REG_NUMBER,
        size: 'medium',
      });
      console.log('🚀 file: databaseSync.js, company', company);
    } else {
      await sequelize.sync();
    }
  } catch (error) {
    console.log('error in databaseSync: ', error);
    res.status(500).json({ message: 'Error in databaseSync', data: error });
  }
};
