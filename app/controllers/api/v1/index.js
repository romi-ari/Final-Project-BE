/**
 * @file contains entry point of controllers api v1 module
 * @author GoTravel Kelompok 5 FSW 2
 */

 const {UserController, encryptPassword, createToken} = require("./UserController");
 const airportController = require("./airportController");
 const planeController = require("./planeController");
 const confirmationController = require("./confirmationController");
 const flightController = require("./flightController");
 const ticketController = require("./ticketController");
 const bookingController = require("./bookingController");
 const whislistController = require("./whislistController");
 const handleGoogleLoginOrRegister = require("./handleGoogleLoginOrRegister");
 const notificationController = require("./notificationController");

 
 module.exports = {
   UserController,
   encryptPassword,
   createToken,
   airportController,
   planeController,
   confirmationController,
   flightController,
   ticketController,
   bookingController,
   whislistController,
   handleGoogleLoginOrRegister,
   notificationController
 };
 