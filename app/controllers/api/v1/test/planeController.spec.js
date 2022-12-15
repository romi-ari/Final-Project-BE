const planeController = require("../planeController");
const mock = require("../../../../../test/mock");

describe("planeController", () => {
  const mockPlane = {
    ...mock.PLANE,
  };
  const mockPlane2 = {
    ...mock.PLANE,
    code: 102,
  };
  const mockPlane3 = {
    ...mock.PLANE,
    name: "Boeing 888-300ER",
  };
  const mockPlaneList = [mockPlane, mockPlane2, mockPlane3];
  describe("#list", () => {
    it("should res.status(200) and return list of planes if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockPlaneService = {
        list: jest.fn().mockReturnValue(mockPlaneList),
      };

      const controller = new planeController(mockPlaneService);
      await controller.list(mockReq, mockRes);

      expect(mockPlaneService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { planes: mockPlaneList },
        meta: { count: mockPlaneList.length },
      });
    });
  });

  describe("#showById", () => {
    it("should res.status(200) and res.json plane if success", async () => {
      const mockReq = {
        params: mockPlane.id,
      };
      const mockRes = mock.RES;
      const mockPlaneService = {
        findByPk: jest.fn().mockReturnValue(mockPlane),
      };

      const controller = new planeController(mockPlaneService);
      await controller.showById(mockReq, mockRes);

      expect(mockPlaneService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: mockPlane,
      });
    });

    it("should res.status(404) if plane not found", async () => {
      const mockReq = {
        params: 999,
      };
      const mockRes = mock.RES;
      const mockPlaneService = {
        findByPk: jest.fn().mockReturnValue(null),
      };

      const controller = new planeController(mockPlaneService);
      await controller.showById(mockReq, mockRes);

      expect(mockPlaneService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id plane tidak ditemukan",
      });
    });
  });

  describe("#create", () => {
    it("should res.status(201) and res.json with plane instance if success", async () => {
      const mockReq = {
        body: {
          code: mockPlane.code,
          name: mockPlane.name,
          status: mockPlane.status,
        },
      };
      const mockRes = mock.RES;
      const mockPlaneService = {
        create: jest.fn().mockReturnValue(mockPlane),
      };

      const controller = new planeController(mockPlaneService);
      await controller.create(mockReq, mockRes);

      expect(mockPlaneService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Create plane successfully",
        data: mockPlane,
      });
    });
  });

  describe("#update", () => {
    it("should res.status(200) if success", async () => {
      const mockReq = {
        params: mockPlane.id,
        body: {
          code: mockPlane.code,
          name: mockPlane.name,
          status: mockPlane.status,
        },
      };
      const mockRes = mock.RES;
      const mockPlaneService = {
        update: jest.fn().mockReturnValue(mockPlane),
      };

      const controller = new planeController(mockPlaneService);
      await controller.update(mockReq, mockRes);

      expect(mockPlaneService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Update plane successfully",
      });
    });

    it("should res.status(404) if plane not found", async () => {
      const mockReq = {
        params: 999,
        body: {
          code: mockPlane.code,
          name: mockPlane.name,
          status: mockPlane.status,
        },
      };
      const mockRes = mock.RES;
      const mockPlaneService = {
        update: jest.fn().mockReturnValue(0),
      };

      const controller = new planeController(mockPlaneService);
      await controller.update(mockReq, mockRes);

      expect(mockPlaneService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id plane tidak ditemukan",
      });
    });
  });

  describe("#destroy", () => {
    it("should res.status(200) on delete success", async () => {
      const mockReq = {
        params: {
          id: mockPlane.id,
        },
      };
      const mockRes = mock.RES;
      const mockPlaneService = {
        destroy: jest.fn().mockReturnValue(mockPlane),
      };

      const controller = new planeController(mockPlaneService);
      await controller.destroy(mockReq, mockRes);

      expect(mockPlaneService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        status: `Delete plane successfully`,
      });
    });

    it("should res.status(404) if plane not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockPlaneService = {
        destroy: jest.fn().mockReturnValue(null),
      };

      const controller = new planeController(mockPlaneService);
      await controller.destroy(mockReq, mockRes);

      expect(mockPlaneService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id plane tidak ditemukan",
      });
    });
  });
});
