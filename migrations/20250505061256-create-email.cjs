'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('email', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.TEXT,
      },
      html: {
        type: Sequelize.TEXT,
      },
      cc: {
        type: Sequelize.STRING,
      },
      bcc: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('email');
  },
};
