'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        id_flight:1,
        id_user:1,
        seat:1,
        name:"budi",
        homephone:"073123456",
        mobilephone:"073123456",
        totalprice:null,
        booking_date:null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_flight:2,
        id_user:1,
        seat:1,
        baggage:1,
        food:true,
        name:"ucok",
        homephone:"073123456",
        mobilephone:"073123456",
        totalprice:null,
        booking_date:null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_flight:3,
        id_user:1,
        seat:1,
        baggage:1,
        food:true,
        name:"badu",
        homephone:"073123456",
        mobilephone:"073123456",
        totalprice:null,
        booking_date:null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_flight:4,
        id_user:1,
        seat:1,
        baggage:1,
        food:false,
        name:"upi",
        homephone:"073123456",
        mobilephone:"073123456",
        totalprice:null,
        booking_date:null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_flight:5,
        id_user:1,
        seat:1,
        baggage:1,
        food:false,
        name:"apan",
        homephone:"073123456",
        mobilephone:"073123456",
        totalprice:null,
        booking_date:null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
