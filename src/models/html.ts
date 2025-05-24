'use strict';

import { Model, DataType, Sequelize, Optional, DataTypes } from 'sequelize';
import { HtmlAttributes, HtmlCreationAttributes } from '@dto/html';

export class Html extends Model<HtmlAttributes, HtmlCreationAttributes> implements HtmlAttributes {
  id!: string;
  name!: string;
  content!: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const initialHtmlmodel = (sequelize: Sequelize): typeof Html => {
  Html.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'html',
      tableName: 'html',
      timestamps: true,
    }
  );
  return Html;
};
