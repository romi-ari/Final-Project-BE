const flightController = require("../flightController");
const mock = require("../../../../../test/mock");

describe("flightController", () => {
  const mockFlight = {
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
  };

  const mockFlight2 = {
    ...mock.FLIGHT,
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
  };
  const mockFlightList = [mockFlight, mockFlight2];
  describe("#list", () => {
    it("should res.status(200) and return list of flights if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockFlightService = {
        list: jest.fn().mockReturnValue(mockFlightList),
      };

      const controller = new flightController(mockFlightService);
      await controller.list(mockReq, mockRes);

      expect(mockFlightService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { flights: mockFlightList },
        meta: { count: mockFlightList.length },
      });
    });
  });

  describe("#showById", () => {
    it("should res.status(200) and res.json flights if success", async () => {
      const mockReq = {
        params: mockFlight.id,
      };
      const mockRes = mock.RES;
      const mockFlightService = {
        findByPk: jest.fn().mockReturnValue(mockFlight),
      };

      const controller = new flightController(mockFlightService);
      await controller.showById(mockReq, mockRes);

      expect(mockFlightService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: mockFlight,
      });
    });

    it("should res.status(404) if flight not found", async () => {
      const mockReq = {
        params: 999,
      };
      const mockRes = mock.RES;
      const mockFlightService = {
        findByPk: jest.fn().mockReturnValue(null),
      };

      const controller = new flightController(mockFlightService);
      await controller.showById(mockReq, mockRes);

      expect(mockFlightService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id flight tidak ditemukan",
      });
    });
  });

  describe("#create", () => {
    it("should res.status(201) and res.json with flight instance if success", async () => {
      const mockReq = {
        body: {
            from_airport_id : mockFlight.from_airport_id,
            to_airport_id : mockFlight.to_airport_id,
            id_plane : mockFlight.id_plane,
            kelas : mockFlight.kelas,
            available_seats : mockFlight.available_seats,
            price : mockFlight.price,
            arrival_time : mockFlight.arrival_time,
            departure_time : mockFlight.departure_time,
            flight_date : mockFlight.flight_date,
        },
      };
      const mockRes = mock.RES;
      const mockFlightService = {
        create: jest.fn().mockReturnValue(mockFlight),
      };

      const controller = new flightController(mockFlightService);
      await controller.create(mockReq, mockRes);

      expect(mockFlightService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Create flight successfully",
        data: mockFlight,
      });
    });
  });

  describe("#update", () => {
    it("should res.status(200) if success", async () => {
      const mockReq = {
        params: mockFlight.id,
        body: {
            from_airport_id : mockFlight.from_airport_id,
            to_airport_id : mockFlight.to_airport_id,
            id_plane : mockFlight.id_plane,
            kelas : mockFlight.kelas,
            available_seats : mockFlight.available_seats,
            price : mockFlight.price,
            arrival_time : mockFlight.arrival_time,
            departure_time : mockFlight.departure_time,
            flight_date : mockFlight.flight_date,
        },
      };
      const mockRes = mock.RES;
      const mockFLightService = {
        update: jest.fn().mockReturnValue(mockFlight),
      };

      const controller = new flightController(mockFLightService);
      await controller.update(mockReq, mockRes);

      expect(mockFLightService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Update flight successfully",
      });
    });

    it("should res.status(404) if flight not found", async () => {
      const mockReq = {
        params: 999,
        body: {
            from_airport_id : mockFlight.from_airport_id,
            to_airport_id : mockFlight.to_airport_id,
            id_plane : mockFlight.id_plane,
            kelas : mockFlight.kelas,
            available_seats : mockFlight.available_seats,
            price : mockFlight.price,
            arrival_time : mockFlight.arrival_time,
            departure_time : mockFlight.departure_time,
            flight_date : mockFlight.flight_date,
        },
      };
      const mockRes = mock.RES;
      const mockFLightService = {
        update: jest.fn().mockReturnValue(0),
      };

      const controller = new flightController(mockFLightService);
      await controller.update(mockReq, mockRes);

      expect(mockFLightService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id flight tidak ditemukan",
      });
    });
  });

  describe("#destroy", () => {
    it("should res.status(200) on delete success", async () => {
      const mockReq = {
        params: {
          id: mockFlight.id,
        },
      };
      const mockRes = mock.RES;
      const mockFlightService = {
        destroy: jest.fn().mockReturnValue(mockFlight),
      };

      const controller = new flightController(mockFlightService);
      await controller.destroy(mockReq, mockRes);

      expect(mockFlightService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        status: `Delete flight successfully`,
      });
    });

    it("should res.status(404) if flight not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockFlightService = {
        destroy: jest.fn().mockReturnValue(null),
      };

      const controller = new flightController(mockFlightService);
      await controller.destroy(mockReq, mockRes);

      expect(mockFlightService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id flight tidak ditemukan",
      });
    });
  });
});
