'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Whislists', [
      {
        id_user: 1,
        id_flight: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 1,
        id_flight: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 1,
        id_flight: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
