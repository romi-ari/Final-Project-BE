'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Flights', [
      {
        from_airport_id: 1,
        to_airport_id:2,
        id_plane:1,
        kelas:"Economy Class",
        available_seats: 80,
        price:1000000,
        arrival_time: "09:06",
        departure_time:"10:06",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 2,
        to_airport_id:1,
        id_plane:1,
        kelas:"Economy Class",
        available_seats: 80,
        price:1000000,
        arrival_time: "09:06",
        departure_time:"10:06",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 1,
        to_airport_id:3,
        id_plane:2,
        kelas:"Business Class",
        available_seats: 40,
        price:2000000,
        arrival_time: "01:00",
        departure_time:"02:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 3,
        to_airport_id:1,
        id_plane:2,
        kelas:"Business Class",
        available_seats: 40,
        price:2000000,
        arrival_time: "01:00",
        departure_time:"02:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 1,
        to_airport_id:4,
        id_plane:3,
        kelas:"First Class",
        available_seats: 20,
        price:3000000,
        arrival_time: "12:00",
        departure_time:"13:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 4,
        to_airport_id:1,
        id_plane:3,
        kelas:"First Class",
        available_seats: 20,
        price:3000000,
        arrival_time: "12:00",
        departure_time:"13:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 1,
        to_airport_id:5,
        id_plane:4,
        kelas:"Economy Class",
        available_seats: 80,
        price:1000000,
        arrival_time: "12:00",
        departure_time:"13:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 1,
        to_airport_id:5,
        id_plane:4,
        kelas:"First Class",
        available_seats: 80,
        price:1000000,
        arrival_time: "12:00",
        departure_time:"13:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 2,
        to_airport_id:1,
        id_plane:5,
        kelas:"Business Class",
        available_seats: 40,
        price:2100000,
        arrival_time: "20:00",
        departure_time:"21:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 1,
        to_airport_id:2,
        id_plane:5,
        kelas:"Business Class",
        available_seats: 40,
        price:2100000,
        arrival_time: "20:00",
        departure_time:"21:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 3,
        to_airport_id:1,
        id_plane:1,
        kelas:"First Class",
        available_seats: 20,
        price:3100000,
        arrival_time: "12:00",
        departure_time:"13:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 1,
        to_airport_id:3,
        id_plane:3,
        kelas:"First Class",
        available_seats: 20,
        price:3100000,
        arrival_time: "15:00",
        departure_time:"16:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Flights', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
