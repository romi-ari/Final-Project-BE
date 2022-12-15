const bcrypt = require("bcryptjs");
const SALT = 10;
const dayjs = require("dayjs");
const now = dayjs();
const isoDate = now.toISOString();
const controllers = require("../app/controllers");

const encryptedPassword = async(password) => {
  return await controllers.api.v1.encryptPassword(password)
}

const mock = {
  RES: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  },

  USER: {
    id: 1,
    email: "user@gmail.com",
    password: toString(encryptedPassword("user")),
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
    password: toString(encryptedPassword("admin")),
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
    password: toString(encryptedPassword("admin")),
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

  TICKET: {
    id: 1,
    category: "ROUND_TRIP",
    from: "JAKARTA",
    to: "MEDAN",
    departureTime: isoDate,
    returnTime: now.add(1, "day").toISOString(),
    price: 980000,
    flightNumber: "AX31V",
    duration: 32,
    imageId: "string",
    imageUrl: "string.com/image.png",
    description: "Lorem ipsum blbalaldanlwdj",
    createdBy: 1,
    createdAt: isoDate,
    updatedBy: 1,
    updatedAt: isoDate,
    deletedAt: isoDate,
  },
};

module.exports = mock;
