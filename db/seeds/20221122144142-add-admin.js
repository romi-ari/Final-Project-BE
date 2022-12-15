"use strict";
const controllers = require("../../app/controllers");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "superadmin@gmail.com",
        password: await controllers.api.v1.encryptPassword(
          "superadmin"
        ),
        role: "superAdmin",
        name: "super Admin",
        username: "superAdmin",
        no_ktp: "123456789",
        gender: "L",
        date_of_birth: "2022-12-01",
        address: "Jalan Suroyo No. 161 Mayangan Kota Probolonggo Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user@gmail.com",
        password: await controllers.api.v1.encryptPassword(
          "user"
        ),
        role: "member",
        name: "User",
        username: "user",
        no_ktp: "123456789",
        gender: "L",
        date_of_birth: "2022-12-01",
        address: "Jalan Suroyo No. 161 Mayangan Kota Probolonggo Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin@gmail.com",
        password: await controllers.api.v1.encryptPassword(
          "admin"
        ),
        role: "admin",
        name: "Admin",
        username: "admin",
        no_ktp: "123456789",
        gender: "L",
        date_of_birth: "2022-12-01",
        address: "Jalan Suroyo No. 161 Mayangan Kota Probolonggo Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Admins", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
