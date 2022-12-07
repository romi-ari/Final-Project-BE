'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Whislists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Users',
          key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate : 'CASCADE'
      },
      id_flight: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Flights',
          key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate : 'CASCADE'
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
    await queryInterface.dropTable('Whislists');
  }
};