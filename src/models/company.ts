'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';
import { DB } from '.'; // type of DB with all models

export interface CompanyAttributes {
  id: number;
  name: string;
  location: string;
}

export type CompanyCreationAttributes = Partial<CompanyAttributes>;

export class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public id!: number;
  public name!: string;
  public location!: string;

  public static associate(db: DB) {
    Company.hasMany(db.Employee, {
      foreignKey: 'companyId',
      as: 'employees',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export const initCompanyModel = (sequelize: Sequelize): typeof Company => {
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'company',
      timestamps: true,
    }
  );
  return Company;
};
