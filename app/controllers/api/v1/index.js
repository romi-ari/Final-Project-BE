/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const adminController = require("./adminController");
const userController = require("./UserController");
const airportController = require("./airportController");
const planeController = require("./planeController");
const confirmationController = require("./confirmationController");
const flightController = require("./flightController");
const ticketController = require("./ticketController");

module.exports = {
  adminController,
  userController,
  airportController,
  planeController,
  confirmationController,
  flightController,
  ticketController
};
