const airportController = require("../airportController");
const mock = require("../../../../../test/mock");

describe("airportController", () => {
  const mockAirport = {
    ...mock.AIRPORT,
  };
  const mockAirport2 = {
    ...mock.AIRPORT,
    province: "Sumatera Utara",
  };
  const mockAirport3 = {
    ...mock.AIRPORT,
    city: "Medan",
  };
  const mockAirportList = [mockAirport, mockAirport2, mockAirport3];
  describe("#list", () => {
    it("should res.status(200) and return list of airports if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockAirportService = {
        list: jest.fn().mockReturnValue(mockAirportList),
      };

      const controller = new airportController(mockAirportService);
      await controller.list(mockReq, mockRes);

      expect(mockAirportService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { airports: mockAirportList },
        meta: { count: mockAirportList.length },
      });
    });
  });

  describe("#showById", () => {
    it("should res.status(200) and res.json airports if success", async () => {
      const mockReq = {
        params : mockAirport.id
      };
      const mockRes = mock.RES;
      const mockAirportService = {
        findByPk: jest.fn().mockReturnValue(mockAirport),
      };

      const controller = new airportController(mockAirportService);
      await controller.showById(mockReq, mockRes);

      expect(mockAirportService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: mockAirport
      });
    });

    it("should res.status(404) if airport not found", async () => {
      const mockReq = {
        params : 999
      };
      const mockRes = mock.RES;
      const mockAirportService = {
        findByPk: jest.fn().mockReturnValue(null),
      };

      const controller = new airportController(mockAirportService);
      await controller.showById(mockReq, mockRes);

      expect(mockAirportService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id airport tidak ditemukan" 
      });
    });
  });

  describe("#create", () => {
    it("should res.status(201) and res.json with airport instance if success", async () => {
      const mockReq = {
        body: {
          name: mockAirport.name,
          province: mockAirport.province,
          city: mockAirport.city,
          country: mockAirport.country,
          status: mockAirport.status,
        },
      };
      const mockRes = mock.RES;
      const mockAirportService = {
        create: jest.fn().mockReturnValue(mockAirport),
      };

      const controller = new airportController(mockAirportService);
      await controller.create(mockReq, mockRes);

      expect(mockAirportService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Create Airport successfully",
        data: mockAirport
      });
    });
  });

  describe("#update", () => {
    it("should res.status(200) if success", async () => {
      const mockReq = {
        params : mockAirport.id,
        body: {
          name: mockAirport.name,
          province: mockAirport.province,
          city: mockAirport.city,
          country: mockAirport.country,
          status: mockAirport.status,
        },
      };
      const mockRes = mock.RES;
      const mockAirportService = {
        update: jest.fn().mockReturnValue(mockAirport),
      };

      const controller = new airportController(mockAirportService);
      await controller.update(mockReq, mockRes);

      expect(mockAirportService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Update Airport successfully",
      });
    });

    it("should res.status(404) if airport not found", async () => {
      const mockReq = {
        params : 999,
        body: {
          name: mockAirport.name,
          province: mockAirport.province,
          city: mockAirport.city,
          country: mockAirport.country,
          status: mockAirport.status,
        },
      };
      const mockRes = mock.RES;
      const mockAirportService = {
        update: jest.fn().mockReturnValue(0),
      };

      const controller = new airportController(mockAirportService);
      await controller.update(mockReq, mockRes);

      expect(mockAirportService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id airport tidak ditemukan" 
      });
    });
  });

  describe("#destroy", () => {
    it("should res.status(200) on delete success", async () => {
      const mockReq = {
        params: {
          id: mockAirport.id,
        },
      };
      const mockRes = mock.RES;
      const mockAirportService = {
        destroy: jest.fn().mockReturnValue(mockAirport),
      };

      const controller = new airportController(mockAirportService);
      await controller.destroy(mockReq, mockRes);

      expect(mockAirportService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        status: `Delete Airport successfully`,
      });
    });

    it("should res.status(404) if airport not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockAirportService = {
        destroy: jest.fn().mockReturnValue(null),
      };

      const controller = new airportController(mockAirportService);
      await controller.destroy(mockReq, mockRes);

      expect(mockAirportService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id airport tidak ditemukan",
      });
    });
  });
});
