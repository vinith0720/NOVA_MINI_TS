import dotenv from 'dotenv';
import { SequelizeOptions } from 'sequelize-typescript';

dotenv.config();

interface DBConfig {
  [key: string]: SequelizeOptions;
}

const config: DBConfig = {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
    host: process.env.HOST!,
    dialect: process.env.DIALECT as any,
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'novamini',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

export default config;
