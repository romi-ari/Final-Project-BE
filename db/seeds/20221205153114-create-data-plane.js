'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Planes', [
      {
        code: 100,
        name: "Boeing 777-300ER",
        status: "On",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        code: 101,
        name: "Boeing 777-301ER",
        status: "On",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 102,
        name: "Boeing 777-302ER",
        status: "On",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 103,
        name: "Boeing 777-303ER",
        status: "On",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 104,
        name: "Boeing 777-304ER",
        status: "On",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Planes', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
