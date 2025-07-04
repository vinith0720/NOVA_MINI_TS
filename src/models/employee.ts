'use strict';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { DB } from '.';
import { EmployeeAttributes, EmployeeCreationAttributes } from '@dto/employee';

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public profileurl?: string;
  public companyId!: number;

  static associate(db: DB) {
    Employee.belongsTo(db.Company, {
      foreignKey: 'companyId',
      as: 'company',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export const initEmployeeModel = (sequelize: Sequelize): typeof Employee => {
  Employee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profileurl: {
        type: DataTypes.STRING,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'company',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Employee',
      tableName: 'employee',
      timestamps: true,
    }
  );
  return Employee;
};
