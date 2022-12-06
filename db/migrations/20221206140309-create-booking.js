'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Flights',
          key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate : 'CASCADE'
      },
      seat: {
        type: Sequelize.INTEGER
      },
      baggage: {
        type: Sequelize.INTEGER
      },
      food: {
        type: Sequelize.BOOLEAN
      },
      name: {
        type: Sequelize.STRING
      },
      homephone: {
        type: Sequelize.STRING
      },
      mobilephone: {
        type: Sequelize.STRING
      },
      totalprice: {
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
    await queryInterface.dropTable('Bookings');
  }
};