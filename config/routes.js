const express = require("express");
const controllers = require("../app/controllers");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const limit = require("./limitSize")
const cors = require("cors");
const handleGoogleLoginOrRegister = require("../app/controllers/api/v1/handleGoogleLoginOrRegister");

const swaggerDocument = YAML.load("./openApi.yaml");

const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.use(cors());
apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apiRouter.post("/api/v1/google", handleGoogleLoginOrRegister);

// apiRouter.get("/api/v1/cars", controllers.api.v1.carController.list);
// apiRouter.post(
//   "/api/v1/cars",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.carController.verifyRoles("superAdmin", "admin"),
//   controllers.api.v1.carController.create
// );
// apiRouter.put(
//   "/api/v1/cars/:id",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.carController.verifyRoles("superAdmin", "admin"),
//   controllers.api.v1.carController.update
// );
// apiRouter.get('/api/v1/cars/:id', controllers.api.v1.carController.show);
// apiRouter.delete(
//   "/api/v1/cars/:id",
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.carController.verifyRoles("superAdmin", "admin"),
//   controllers.api.v1.carController.destroy
// );
apiRouter.get(
  "/api/v1/profile",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.whoAmI
);
apiRouter.get(
  "/api/v1/profileAdmin",
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.whoAmI
);
apiRouter.put(
  "/api/v1/updateUser",
  controllers.api.v1.userController.authorize, limit,
  controllers.api.v1.userController.updateUser
);

apiRouter.post(
  "/api/v1/loginAdmin",
  controllers.api.v1.adminController.loginAdmin
);
apiRouter.put(
  "/api/v1/updateAdmin",
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.updateAdmin
);
apiRouter.post("/api/v1/login", controllers.api.v1.userController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);
apiRouter.post(
  "/api/v1/createAdmin",
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin"),
  controllers.api.v1.adminController.createAdmin
);

//End Point Airport

apiRouter.get("/api/v1/airport", controllers.api.v1.airportController.list);
apiRouter.post(
  "/api/v1/airport", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.airportController.create
);
apiRouter.put(
  "/api/v1/airport/:id", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.airportController.update
);
apiRouter.get('/api/v1/airport/:id', controllers.api.v1.airportController.show);
apiRouter.delete(
  "/api/v1/airport/:id",
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.airportController.destroy
);

//End Point Plane

apiRouter.get("/api/v1/plane", controllers.api.v1.planeController.list);
apiRouter.post(
  "/api/v1/plane", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.planeController.create
);
apiRouter.put(
  "/api/v1/plane/:id", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.planeController.update
);
apiRouter.get('/api/v1/plane/:id', controllers.api.v1.planeController.show);
apiRouter.delete(
  "/api/v1/plane/:id",
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.planeController.destroy
);

//cloudinary upload file (receipt)
apiRouter.get("/confirmation", limit, controllers.api.v1.confirmationController.list)
apiRouter.post("/confirmation", limit, controllers.api.v1.confirmationController.create)
apiRouter.put("/confirmation/:id", limit, controllers.api.v1.confirmationController.update)
apiRouter.delete("/confirmation/:id", limit, controllers.api.v1.confirmationController.destroy)

//END POINT FLIGHT
apiRouter.get("/api/v1/flight", controllers.api.v1.flightController.list);
apiRouter.post(
  "/api/v1/flight", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.flightController.create
);
apiRouter.put(
  "/api/v1/flight/:id", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.flightController.update
);
apiRouter.get('/api/v1/flight/:id', controllers.api.v1.flightController.show);
apiRouter.delete(
  "/api/v1/flight/:id",
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.flightController.destroy
);

//END POINT TICKET
apiRouter.get("/api/v1/ticket", controllers.api.v1.ticketController.list);
apiRouter.post(
  "/api/v1/ticket", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.ticketController.create
);
apiRouter.put(
  "/api/v1/ticket/:id", 
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.ticketController.update
);
apiRouter.get('/api/v1/ticket/:id', controllers.api.v1.ticketController.show);
apiRouter.delete(
  "/api/v1/ticket/:id",
  controllers.api.v1.adminController.authorize,
  controllers.api.v1.adminController.verifyRoles("superAdmin", "admin"),
  controllers.api.v1.ticketController.destroy
);




apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
