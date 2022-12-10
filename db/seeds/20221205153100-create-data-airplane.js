'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert('Airports', [
    {
      name: "Bandara Udara Internasional Soekarno–Hatta",
      province: "Banten",
      city: "Tangerang",
      country: "Indonesia",
      status: "On",
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      name: "Bandara Udara Internasional Ngurah Rai",
      province: "Bali",
      city: "Denpasar",
      country: "Indonesia",
      status: "On",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Bandara Udara Internasional Juanda",
      province: "Jawa Timur",
      city: "Sidoarjo",
      country: "Indonesia",
      status: "On",
      createdAt: new Date(),
      updatedAt: new Date()      
    },
    {
      name: "Bandara Udara Internasional Sultan Hasanuddin",
      province: "Sulawesi Selatan",
      city: "Makassar",
      country: "Indonesia",
      status: "On",
      createdAt: new Date(),
      updatedAt: new Date()    
    },
    {
      name: "Bandara Udara Internasional Kualanamu",
      province: "Sumatra Utara",
      city: "Deli Serdang",
      country: "Indonesia",
      status: "On",
      createdAt: new Date(),
      updatedAt: new Date()      
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Airports', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
