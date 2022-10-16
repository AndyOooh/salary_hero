import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Employee } from '../models/employee.model.js';
import sequelize from './databaseConnect.js';
import { SH_COMPANY_ID, SH_REG_NUMBER } from './VARS.js';
import { createUser } from '../controllers/user.controller.js';
console.log('🚀 ~ file: databaseSync.js ~ line 6 ~ SH_COMPANY_ID 2222', SH_COMPANY_ID);
console.log('🚀 ~ file: databaseSync.js ~ line 6 ~ SH_REG_NO', SH_REG_NUMBER);

// setting up model/table relations for benefits such as auto foreign_ids
Employee.belongsTo(Company, { constraints: true, onDelete: 'CASCADE' });
Company.hasMany(Employee);
User.belongsTo(Company, { constraints: true, onDelete: 'CASCADE' });
Company.hasMany(User);

// {force: true} is for development only. It will drop all tables and recreate them.
export const databaseSync = async () => {
  try {
    await sequelize.sync({ force: true });
    // await sequelize.sync();
    const company = await Company.create({
      name: 'Salary Hero',
      registration_number: SH_REG_NUMBER,
      size: 'medium',
    });
    console.log('🚀 ~ file: databaseSync.js ~ line 25 ~ company', company);
    console.log('company created');

    // await createUser({
    //   first_name: 'Sync',
    //   last_name: 'One',
    //   email: 'sync@one.com',
    //   password: 12345678,
    //   companyId: company.id,
    // });
  } catch (error) {
    console.log('error in databaseSync: ', error);
  }
};
