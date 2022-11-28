/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const adminController = require("./adminController");
const userController = require("./UserController");
const airportController = require("./airportController");
const planeController = require("./planeController");

module.exports = {
  adminController,
  userController,
  airportController,

};
