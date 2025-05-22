import { Sequelize } from 'sequelize';
import { initCompanyModel, Company } from '@models/company';
import { initEmployeeModel, Employee } from '@models/employee';
import { initEmailModel, Email } from '@models/emailtable';
import { initialHtmlmodel, Html } from './html';

import dbconfig from '@config/config';

export interface DB {
  sequelize: Sequelize;
  Company: typeof Company;
  Employee: typeof Employee;
  Email: typeof Email;
  Html: typeof Html;
}

const env = process.env.NODE_ENV || 'development';
const config = dbconfig[env];

if (!config) {
  console.error(`❌ Database configuration for environment '${env}' not found!`);
  process.exit(1);
}

const sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password,
  config
);

// Initialize models (assigning returned class to constant for clarity)
const CompanyModel = initCompanyModel(sequelize);
const EmployeeModel = initEmployeeModel(sequelize);
const EmailModel = initEmailModel(sequelize);
const HtmlModel = initialHtmlmodel(sequelize);

// Cast as DB shape
const db: DB = {
  sequelize,
  Company: CompanyModel,
  Employee: EmployeeModel,
  Email: EmailModel,
  Html: HtmlModel,
};

// Associate models
CompanyModel.associate?.(db);
EmployeeModel.associate?.(db);

export default db;
