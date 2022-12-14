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
        baggage:"20",
        food:"true",
        arrival_time: "14:00",
        departure_time:"15:00",
        flight_date:"2022-12-12",
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
        baggage:"20",
        food:"true",
        arrival_time: "14:00",
        departure_time:"15:00",
        flight_date:"2022-12-14",
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
        baggage:"20",
        food:"true",
        arrival_time: "16:00",
        departure_time:"17:00",
        flight_date:"2022-12-12",
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
        baggage:"20",
        food:"true",
        arrival_time: "16:00",
        departure_time:"17:00",
        flight_date:"2022-12-14",
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
        baggage:"20",
        food:"true",
        arrival_time: "18:00",
        departure_time:"19:00",
        flight_date:"2022-12-16",
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
        baggage:"20",
        food:"true",
        arrival_time: "18:00",
        departure_time:"19:00",
        flight_date:"2022-12-18",
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
        baggage:"20",
        food:"true",
        arrival_time: "20:00",
        departure_time:"21:00",
        flight_date:"2022-12-20",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_airport_id: 5,
        to_airport_id:1,
        id_plane:4,
        kelas:"First Class",
        available_seats: 80,
        price:1000000,
        baggage:"20",
        food:"true",
        arrival_time: "20:00",
        departure_time:"21:00",
        flight_date:"2022-12-22",
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
        baggage:"20",
        food:"true",
        arrival_time: "09:00",
        departure_time:"10:00",
        flight_date:"2022-12-24",
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
        baggage:"20",
        food:"true",
        arrival_time: "09:00",
        departure_time:"10:00",
        flight_date:"2022-12-26",
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
        baggage:"20",
        food:"true",
        arrival_time: "11:00",
        departure_time:"12:00",
        flight_date:"2022-12-28",
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
        baggage:"20",
        food:"true",
        arrival_time: "11:00",
        departure_time:"12:00",
        flight_date:"2022-12-30",
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
