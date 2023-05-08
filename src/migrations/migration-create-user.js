'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      old: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.TEXT
      },
      phoneNumber: {
        type: Sequelize.TEXT
      },
      cartNumberPlates: {
        type: Sequelize.TEXT
      },
      access: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};