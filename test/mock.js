const bcrypt = require("bcryptjs");
const SALT = 10;
const dayjs = require("dayjs");
const now = dayjs();
const isoDate = now.toISOString();
const controllers = require("../app/controllers");


const mock = {
  RES: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  },

  USER: {
    id: 1,
    email: "user@gmail.com",
    password: bcrypt.hashSync("user", SALT),
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

  ADMIN: {
    id: 1,
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin", SALT),
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

  SUPERADMIN: {
    id: 1,
    email: "superadmin@gmail.com",
    password: bcrypt.hashSync("superadmin", SALT),
    role: "superAdmin",
    name: "Super Admin",
    username: "superAdmin",
    no_ktp: "123456789",
    gender: "L",
    date_of_birth: "2022-12-01",
    address: "Jalan Suroyo No. 161 Mayangan Kota Probolonggo Indonesia",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  AIRPORT: {
    id: 1,
    name: "Bandara Udara Internasional Ngurah Rai",
    province: "Bali",
    city: "Denpasar",
    country: "Indonesia",
    status: "On",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  PLANE: {
    id: 1,
    code: 100,
    name: "Boeing 777-300ER",
    status: "On",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  FLIGHT: {
    id: 1,
    id_plane: 1,
    from_airport_id: 1,
    to_airport_id: 2,
    kelas: "First Class",
    available_seats: 20,
    price: 3100000,
    arrival_time: "11:00",
    departure_time: "12:00",
    flight_date: "2022-12-28",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  BOOKING: {
    id: 1,
    id_flight: 1,
    id_user: 1,
    seat: 1,
    baggage: 1,
    food: true,
    name: "ucok",
    homephone: "073123456",
    mobilephone: "073123456",
    totalprice: 120000,
    booking_date: "2022-12-28",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  TICKET: {
    id: 1,
    id_booking: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  WHISLIST: {
    id: 1,
    id_flight: 1,
    id_user: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  NOTIFICATION: {
    id: 1,
    message: "Good Job",
    id_user: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

module.exports = mock;
