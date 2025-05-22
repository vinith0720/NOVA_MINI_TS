'use strict';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface EmailAttributes {
  id: number;
  type: string;
  subject: string;
  html: string;
  cc?: string;
  bcc?: string;
}

// For `create()` calls, `id` is optional (auto-increment)
type EmailCreationAttributes = Optional<EmailAttributes, 'id' | 'bcc' | 'cc'>;

// Sequelize Model class
export class Email
  extends Model<EmailAttributes, EmailCreationAttributes>
  implements EmailAttributes
{
  public id!: number;
  public type!: string;
  public subject!: string;
  public html!: string;
  public cc!: string;
  public bcc!: string;
}

// Initialize model
export function initEmailModel(sequelize: Sequelize): typeof Email {
  Email.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      html: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cc: {
        type: DataTypes.STRING,
      },
      bcc: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'email',
      modelName: 'Email',
      sequelize, // passing the sequelize instance
    }
  );

  return Email;
}
