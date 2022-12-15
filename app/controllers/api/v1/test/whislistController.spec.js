const whislistController = require("../whislistController");
const mock = require("../../../../../test/mock");

describe("whislistController", () => {
  const mockWhislist = {
    ...mock.WHISLIST,
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

  const mockWhislist2 = {
    ...mock.WHISLIST,
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
  const mockWhislistList = [mockWhislist, mockWhislist2];
  describe("#list", () => {
    it("should res.status(200) and return list of whislists if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockWhislistService = {
        list: jest.fn().mockReturnValue(mockWhislistList),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.list(mockReq, mockRes);

      expect(mockWhislistService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { whislists: mockWhislistList },
        meta: { count: mockWhislistList.length },
      });
    });
  });

  describe("#showById", () => {
    it("should res.status(200) and res.json whislists if success", async () => {
      const mockReq = {
        params: mockWhislist.id,
      };
      const mockRes = mock.RES;
      const mockWhislistService = {
        findByPk: jest.fn().mockReturnValue(mockWhislist),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.showById(mockReq, mockRes);

      expect(mockWhislistService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: mockWhislist,
      });
    });

    it("should res.status(404) if whislist not found", async () => {
      const mockReq = {
        params: 999,
      };
      const mockRes = mock.RES;
      const mockWhislistService = {
        findByPk: jest.fn().mockReturnValue(null),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.showById(mockReq, mockRes);

      expect(mockWhislistService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id whislist tidak ditemukan",
      });
    });
  });

  describe("#create", () => {
    it("should res.status(201) and res.json with whislist instance if success", async () => {
      const mockReq = {
        user : mock.USER,
        body: {
            ...mock.WHISLIST
        },
      };
      const mockRes = mock.RES;
      const mockWhislistService = {
        create: jest.fn().mockReturnValue(mockWhislist),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.create(mockReq, mockRes);

      expect(mockWhislistService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Create whislist successfully",
        data: mockWhislist,
      });
    });
  });

  describe("#update", () => {
    it("should res.status(200) if success", async () => {
      const mockReq = {
        params: mockWhislist.id,
        user : mock.USER,
        body: {
            ...mock.WHISLIST,
            id_flight : 2
        },
      };
      const mockRes = mock.RES;
      const mockWhislistService = {
        update: jest.fn().mockReturnValue(mockWhislist),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.update(mockReq, mockRes);

      expect(mockWhislistService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Update whislist successfully",
      });
    });

    it("should res.status(404) if whislist not found", async () => {
      const mockReq = {
        params: 999,
        user : mock.USER,
        body: {
            ...mock.WHISLIST,
            id_flight : 2
        },
      };
      const mockRes = mock.RES;
      const mockWhislistService = {
        update: jest.fn().mockReturnValue(0),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.update(mockReq, mockRes);

      expect(mockWhislistService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id whislist tidak ditemukan",
      });
    });
  });

  describe("#destroy", () => {
    it("should res.status(200) on delete success", async () => {
      const mockReq = {
        params: {
          id: mockWhislist.id,
        },
      };
      const mockRes = mock.RES;
      const mockWhislistService = {
        destroy: jest.fn().mockReturnValue(mockWhislist),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.destroy(mockReq, mockRes);

      expect(mockWhislistService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        status: `Delete whislist successfully`,
      });
    });

    it("should res.status(404) if whislist not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockWhislistService = {
        destroy: jest.fn().mockReturnValue(null),
      };

      const controller = new whislistController(mockWhislistService);
      await controller.destroy(mockReq, mockRes);

      expect(mockWhislistService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id whislist tidak ditemukan",
      });
    });
  });
});
