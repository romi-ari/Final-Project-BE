'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_plane: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Planes',
          key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate : 'CASCADE'
      },
      from_airport_id: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Airports',
          key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate : 'CASCADE'
      },
      to_airport_id: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Airports',
          key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate : 'CASCADE'
      },
      kelas: {
        type: Sequelize.STRING
      },
      available_seats: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      arrival_time: {
        type: Sequelize.STRING
      },
      departure_time: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Flights');
  }
};