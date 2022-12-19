const bookingController = require("../bookingController");
const mock = require("../../../../../test/mock");

describe("bookingController", () => {
  const mockBooking = {
    ...mock.BOOKING,
    Flight: {
      ...mock.FLIGHT,
      Plane: {
        ...mock.PLANE,
      },
      FromAirport: {
        ...mock.AIRPORT,
      },
      ToAirport: {
        ...mock.AIRPORT,
        id: 2,
      },
    },
    User: {
      ...mock.USER,
    },
  };

  const mockBooking2 = {
    ...mock.BOOKING,
    id_flight: 2,
    Flight: {
      ...mock.FLIGHT,
      id: 2,
      from_airport_id: 2,
      to_airport_id: 1,
      Plane: {
        ...mock.PLANE,
      },
      FromAirport: {
        ...mock.AIRPORT,
        id: 2,
      },
      ToAirport: {
        ...mock.AIRPORT,
      },
    },
  };
  const mockBookingList = [mockBooking, mockBooking2];
  describe("#list", () => {
    it("should res.status(200) and return list of bookings if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockBookingService = {
        list: jest.fn().mockReturnValue(mockBookingList),
      };

      const controller = new bookingController(mockBookingService);
      await controller.list(mockReq, mockRes);

      expect(mockBookingService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { bookings: mockBookingList },
        meta: { count: mockBookingList.length },
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {};
      const mockRes = mock.RES;
      const mockBookingService = {
        list: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new bookingController(mockBookingService);
      await controller.list(mockReq, mockRes);

      expect(mockBookingService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#showById", () => {
    it("should res.status(200) and res.json bookings if success", async () => {
      const mockReq = {
        params: mockBooking.id,
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        findByPk: jest.fn().mockReturnValue(mockBooking),
      };

      const controller = new bookingController(mockBookingService);
      await controller.showById(mockReq, mockRes);

      expect(mockBookingService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: mockBooking,
      });
    });

    it("should res.status(404) if booking not found", async () => {
      const mockReq = {
        params: 999,
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        findByPk: jest.fn().mockReturnValue(null),
      };

      const controller = new bookingController(mockBookingService);
      await controller.showById(mockReq, mockRes);

      expect(mockBookingService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id booking tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: mockBooking.id,
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        findByPk: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new bookingController(mockBookingService);
      await controller.showById(mockReq, mockRes);

      expect(mockBookingService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#create", () => {
    it("should res.status(201) and res.json with booking instance if success", async () => {
      const mockReq = {
        user : mock.USER,
        body: {
            ...mock.BOOKING
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        create: jest.fn().mockReturnValue(mockBooking),
      };

      const controller = new bookingController(mockBookingService);
      await controller.create(mockReq, mockRes);

      expect(mockBookingService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Create Booking successfully",
        data: mockBooking,
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        user : mock.USER,
        body: {
            ...mock.BOOKING
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        create: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new bookingController(mockBookingService);
      await controller.create(mockReq, mockRes);

      expect(mockBookingService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#update", () => {
    it("should res.status(200) if success", async () => {
      const mockReq = {
        params: mockBooking.id,
        user : mock.USER,
        body: {
            ...mock.BOOKING,
            id_flight : 2
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        update: jest.fn().mockReturnValue(mockBooking),
      };

      const controller = new bookingController(mockBookingService);
      await controller.update(mockReq, mockRes);

      expect(mockBookingService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Update Booking successfully",
      });
    });

    it("should res.status(404) if booking not found", async () => {
      const mockReq = {
        params: 999,
        user : mock.USER,
        body: {
            ...mock.BOOKING,
            id_flight : 2
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        update: jest.fn().mockReturnValue(0),
      };

      const controller = new bookingController(mockBookingService);
      await controller.update(mockReq, mockRes);

      expect(mockBookingService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id booking tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: mockBooking.id,
        user : mock.USER,
        body: {
            ...mock.BOOKING,
            id_flight : 2
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        update: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new bookingController(mockBookingService);
      await controller.update(mockReq, mockRes);

      expect(mockBookingService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#destroy", () => {
    it("should res.status(200) on delete success", async () => {
      const mockReq = {
        params: {
          id: mockBooking.id,
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        destroy: jest.fn().mockReturnValue(mockBooking),
      };

      const controller = new bookingController(mockBookingService);
      await controller.destroy(mockReq, mockRes);

      expect(mockBookingService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        status: `Delete booking successfully`,
      });
    });

    it("should res.status(404) if booking not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        destroy: jest.fn().mockReturnValue(null),
      };

      const controller = new bookingController(mockBookingService);
      await controller.destroy(mockReq, mockRes);

      expect(mockBookingService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id booking tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: {
          id: mockBooking.id,
        },
      };
      const mockRes = mock.RES;
      const mockBookingService = {
        destroy: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new bookingController(mockBookingService);
      await controller.destroy(mockReq, mockRes);

      expect(mockBookingService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });
});
