const express = require("express");
const controllers = require("../app/controllers");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const limit = require("./limitSize");
const cors = require("cors");

const swaggerDocument = YAML.load("./openApi.yaml");

const apiRouter = express.Router();

apiRouter.use(cors());

//API Docoumentation

apiRouter.use("/api-docs",
  swaggerUi.serve, swaggerUi.setup(swaggerDocument)
);

//Google Login API

apiRouter.post("/api/v1/google",
  controllers.api.v1.handleGoogleLoginOrRegister
);

//Login untuk member, admin, superAdmin  

apiRouter.post("/api/v1/login", 
  controllers.api.v1.userController.login
);

// End Point User

apiRouter.get("/api/v1/profile",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.whoAmI
);

apiRouter.put("/api/v1/updateUser",
  controllers.api.v1.userController.authorize,
  limit,
  controllers.api.v1.userController.updateUser
);

apiRouter.post("/api/v1/register", 
  controllers.api.v1.userController.register
);

apiRouter.delete("/api/v1/userDelete/:id", 
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("member"),
  controllers.api.v1.userController.userDelete
);

//Admin and superAdmin Operation

apiRouter.post("/api/v1/createAdmin",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin"),
  controllers.api.v1.userController.createAdmin
);

  // get all user

apiRouter.get("/api/v1/user",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.userController.list
);

  // get all admin

apiRouter.get("/api/v1/Admin",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.userController.listAdmin
); 

  // get all member

apiRouter.get("/api/v1/Member",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.userController.listMember
); 

//End Point Airport

apiRouter.get("/api/v1/airport", 
  controllers.api.v1.airportController.list
);

apiRouter.post("/api/v1/airport",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.airportController.create
);

apiRouter.put("/api/v1/airport/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.airportController.update
);

apiRouter.get("/api/v1/airport/:id", 
  controllers.api.v1.airportController.show
);

apiRouter.delete("/api/v1/airport/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.airportController.destroy
);

//End Point Plane

apiRouter.get("/api/v1/plane", 
  controllers.api.v1.planeController.list
);

apiRouter.post("/api/v1/plane",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.planeController.create
);

apiRouter.put("/api/v1/plane/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.planeController.update
);

apiRouter.get("/api/v1/plane/:id", 
  controllers.api.v1.planeController.show
);

apiRouter.delete("/api/v1/plane/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.planeController.destroy
);

//cloudinary upload file (receipt)

apiRouter.get("/confirmation",
  limit,
  controllers.api.v1.confirmationController.list
);

apiRouter.post("/confirmation",
  limit,
  controllers.api.v1.confirmationController.create
);

apiRouter.put("/confirmation/:id",
  limit,
  controllers.api.v1.confirmationController.update
);
apiRouter.delete("/confirmation/:id",
  limit,
  controllers.api.v1.confirmationController.destroy
);

//END POINT FLIGHT
apiRouter.get("/api/v1/flight", 
  controllers.api.v1.flightController.list
);

apiRouter.post("/api/v1/flight",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.flightController.create
);

apiRouter.put("/api/v1/flight/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.flightController.update
);

apiRouter.get("/api/v1/flight/:id", 
  controllers.api.v1.flightController.show
);

apiRouter.delete("/api/v1/flight/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.flightController.destroy
);

//END POINT TICKET

apiRouter.get("/api/v1/ticket", 
  controllers.api.v1.ticketController.list
);

apiRouter.post("/api/v1/ticket",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.ticketController.create
);

apiRouter.put("/api/v1/ticket/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.ticketController.update
);

apiRouter.get("/api/v1/ticket/:id", 
  controllers.api.v1.ticketController.show
);

apiRouter.delete("/api/v1/ticket/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.ticketController.destroy
);

//END POINT Booking

apiRouter.get("/api/v1/booking", 
  controllers.api.v1.bookingController.list
);

apiRouter.post("/api/v1/booking",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.bookingController.create
);

apiRouter.put("/api/v1/booking/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.bookingController.update
);

apiRouter.get("/api/v1/booking/:id", 
  controllers.api.v1.bookingController.show
);

apiRouter.delete("/api/v1/booking/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.bookingController.destroy
);

//END POINT Whislist

apiRouter.get("/api/v1/whislist", 
  controllers.api.v1.whislistController.list
);

apiRouter.post("/api/v1/whislist",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.whislistController.create
);

apiRouter.put("/api/v1/whislist/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.whislistController.update
);

apiRouter.get("/api/v1/whislist/:id", 
  controllers.api.v1.whislistController.show
);

apiRouter.delete("/api/v1/whislist/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.whislistController.destroy
);



apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
