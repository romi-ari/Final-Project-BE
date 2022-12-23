const express = require("express");
const controllers = require("../app/controllers");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const limit = require("./limitSize");
const cors = require("cors");
const {
  userService,
  airportService,
  bookingService,
  planeService,
  flightService,
  ticketService,
  whislistService,
  notificationService
} = require("../app/services");

const swaggerDocument = YAML.load("./openApi.yaml");

const apiRouter = express.Router();

apiRouter.use(cors());

//API Docoumentation

apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userController = new controllers.api.v1.UserController(userService);

//Google Login API

apiRouter.post(
  "/api/v1/google",
  userController.handleGoogleLoginOrRegister
);

//Login untuk member, admin, superAdmin

apiRouter.post("/api/v1/login", userController.login);

// End Point User

apiRouter.get(
  "/api/v1/profile",
  userController.authorize,
  userController.whoAmI
);

apiRouter.put(
  "/api/v1/updateUser",
  userController.authorize,
  userController.updateUser
);

apiRouter.put(
  "/api/v1/updateProfileUser",
  userController.authorize,
  limit,
  userController.updateProfileUser
);

apiRouter.post("/api/v1/register", userController.register);

apiRouter.delete(
  "/api/v1/deleteUser/:id",
  userController.authorize,
  userController.authorizeUser,
  userController.deleteUser
);

//Admin and superAdmin Operation

apiRouter.post(
  "/api/v1/createAdmin",
  userController.authorize,
  userController.authorizeSuperAdmin,
  userController.createAdmin
);

// get all user

apiRouter.get(
  "/api/v1/user",
  userController.authorize,
  userController.authorizeAdmin,
  userController.listUser
);

// get all admin

apiRouter.get(
  "/api/v1/Admin",
  userController.authorize,
  userController.authorizeAdmin,
  userController.listAdmin
);

// get all member

apiRouter.get(
  "/api/v1/Member",
  userController.authorize,
  userController.authorizeAdmin,
  userController.listMember
);

//End Point Airport

const airportController = new controllers.api.v1.airportController(
  airportService
);

apiRouter.get("/api/v1/airport", airportController.list);

apiRouter.post(
  "/api/v1/airport",
  userController.authorize,
  userController.authorizeAdmin,
  airportController.create
);

apiRouter.put(
  "/api/v1/airport/:id",
  userController.authorize,
  userController.authorizeAdmin,
  airportController.update
);

apiRouter.get("/api/v1/airport/:id", airportController.showById);

apiRouter.delete(
  "/api/v1/airport/:id",
  userController.authorize,
  userController.authorizeAdmin,
  airportController.destroy
);

//End Point Plane

const planeController = new controllers.api.v1.planeController(planeService);

apiRouter.get("/api/v1/plane", planeController.list);

apiRouter.post(
  "/api/v1/plane",
  userController.authorize,
  userController.authorizeAdmin,
  planeController.create
);

apiRouter.put(
  "/api/v1/plane/:id",
  userController.authorize,
  userController.authorizeAdmin,
  planeController.update
);

apiRouter.get("/api/v1/plane/:id", planeController.showById);

apiRouter.delete(
  "/api/v1/plane/:id",
  userController.authorize,
  userController.authorizeAdmin,
  planeController.destroy
);

//cloudinary upload file (receipt)

apiRouter.get(
  "/confirmation",
  userController.authorize,
  userController.authorizeAdmin,
  limit,
  controllers.api.v1.confirmationController.list
);

apiRouter.post(
  "/confirmation",
  userController.authorize,
  userController.authorizeUser,
  limit,
  controllers.api.v1.confirmationController.create
);

apiRouter.put(
  "/confirmation/:id",
  userController.authorize,
  userController.authorizeUser,
  limit,
  controllers.api.v1.confirmationController.update
);

apiRouter.delete(
  "/confirmation/:id",
  userController.authorize,
  userController.authorizeUser,
  limit,
  controllers.api.v1.confirmationController.destroy
);

//END POINT FLIGHT

const flightController = new controllers.api.v1.flightController(flightService);

apiRouter.get("/api/v1/flight", flightController.list);

apiRouter.post(
  "/api/v1/flight",
  userController.authorize,
  userController.authorizeAdmin,
  flightController.create
);

apiRouter.put(
  "/api/v1/flight/:id",
  userController.authorize,
  userController.authorizeAdmin,
  flightController.update
);

apiRouter.get("/api/v1/flight/:id", flightController.showById);

apiRouter.delete(
  "/api/v1/flight/:id",
  userController.authorize,
  userController.authorizeAdmin,
  flightController.destroy
);

//END POINT TICKET

const ticketController = new controllers.api.v1.ticketController(ticketService);

apiRouter.get("/api/v1/ticket", ticketController.list);

apiRouter.post(
  "/api/v1/ticket",
  userController.authorize,
  userController.authorizeUser,
  ticketController.create
);

apiRouter.put(
  "/api/v1/ticket/:id",
  userController.authorize,
  userController.authorizeAdmin,
  ticketController.update
);

apiRouter.get("/api/v1/ticket/:id", ticketController.showById);

apiRouter.delete(
  "/api/v1/ticket/:id",
  userController.authorize,
  userController.authorizeAdmin,
  ticketController.destroy
);

//END POINT Booking

const bookingController = new controllers.api.v1.bookingController(
  bookingService
);

apiRouter.get("/api/v1/booking", bookingController.list);

apiRouter.post(
  "/api/v1/booking",
  userController.authorize,
  bookingController.create
);

apiRouter.put(
  "/api/v1/booking/:id",
  userController.authorize,
  bookingController.update
);

apiRouter.get("/api/v1/booking/:id", bookingController.showById);

apiRouter.delete(
  "/api/v1/booking/:id",
  userController.authorize,
  bookingController.destroy
);

//END POINT Whislist

const whislistController = new controllers.api.v1.whislistController(whislistService);

apiRouter.get("/api/v1/whislist", whislistController.list);

apiRouter.post(
  "/api/v1/whislist",
  userController.authorize,
  whislistController.create
);

apiRouter.put(
  "/api/v1/whislist/:id",
  userController.authorize,
  whislistController.update
);

apiRouter.get(
  "/api/v1/whislist/:id",
  whislistController.showById
);

apiRouter.delete(
  "/api/v1/whislist/:id",
  userController.authorize,
  whislistController.destroy
);

//End Point Notification

const notificationController = new controllers.api.v1.notificationController(notificationService);

apiRouter.get("/api/v1/notification", notificationController.list);

apiRouter.post(
  "/api/v1/notification",
  userController.authorize,
  notificationController.create
);

apiRouter.put(
  "/api/v1/notification/:id",
  userController.authorize,
  notificationController.update
);

apiRouter.get(
  "/api/v1/notification/:id",
  userController.authorize,
  notificationController.showById
);

apiRouter.delete(
  "/api/v1/notification/:id",
  userController.authorize,
  notificationController.destroy
);


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
