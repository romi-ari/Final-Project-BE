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
        arrival_time: "2022-12-12T14:00:00.259Z",
        departure_time:"2022-12-12T15:00:00.259Z",
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
        arrival_time: "2022-12-14T14:00:00.259Z",
        departure_time:"2022-12-14T15:00:00.259Z",
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
        arrival_time: "2022-12-16T16:00:00.259Z",
        departure_time:"2022-12-16T17:00:00.259Z",
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
        arrival_time: "2022-12-18T16:00:00.259Z",
        departure_time:"2022-12-18T17:00:00.259Z",
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
        arrival_time: "2022-12-20T18:00:00.259Z",
        departure_time:"2022-12-20T19:00:00.259Z",
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
        arrival_time: "2022-12-22T18:00:00.259Z",
        departure_time:"2022-12-22T19:00:00.259Z",
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
        arrival_time: "2022-12-24T20:00:00.259Z",
        departure_time:"2022-12-24T21:00:00.259Z",
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
        arrival_time: "2022-12-26T20:00:00.259Z",
        departure_time:"2022-12-26T21:00:00.259Z",
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
        arrival_time: "2023-01-01T09:00:00.259Z",
        departure_time:"2023-01-01T10:00:00.259Z",
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
        arrival_time: "2023-01-03T09:00:00.259Z",
        departure_time:"2023-01-03T10:00:00.259Z",
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
        arrival_time: "2023-01-05T11:00:00.259Z",
        departure_time:"2023-01-05T12:00:00.259Z",
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
        arrival_time: "2023-01-07T11:00:00.259Z",
        departure_time:"2023-01-07T12:00:00.259Z",
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
