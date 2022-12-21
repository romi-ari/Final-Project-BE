const notificationController = require("../notificationController");
const mock = require("../../../../../test/mock");

describe("notificationController", () => {
  const mockNotification = {
    ...mock.NOTIFICATION,
    User: {
      ...mock.USER,
    },
  };
  const mockNotification2 = {
    ...mock.NOTIFICATION,
    id_user : 2,
    User: {
      ...mock.USER,
      id:2
    },
  };
  const mockNotificationList = [mockNotification, mockNotification2];
  describe("#list", () => {
    it("should res.status(200) and return list of notification if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockNotificationService = {
        list: jest.fn().mockReturnValue(mockNotificationList),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.list(mockReq, mockRes);

      expect(mockNotificationService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { notifications: mockNotificationList },
        meta: { count: mockNotificationList.length },
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {};
      const mockRes = mock.RES;
      const mockNotificationService = {
        list: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.list(mockReq, mockRes);

      expect(mockNotificationService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#showById", () => {
    it("should res.status(200) and res.json notification if success", async () => {
      const mockReq = {
        params: mockNotification.id,
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        findByPk: jest.fn().mockReturnValue(mockNotification),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.showById(mockReq, mockRes);

      expect(mockNotificationService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: mockNotification,
      });
    });

    it("should res.status(404) if notification not found", async () => {
      const mockReq = {
        params: 999,
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        findByPk: jest.fn().mockReturnValue(null),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.showById(mockReq, mockRes);

      expect(mockNotificationService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id notification tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: mockNotification.id,
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        findByPk: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.showById(mockReq, mockRes);

      expect(mockNotificationService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#create", () => {
    it("should res.status(201) and res.json with notification instance if success", async () => {
      const mockReq = {
        body: {
          ...mock.NOTIFICATION,
        },
        user: {
          ...mock.USER
        }
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        create: jest.fn().mockReturnValue(mockNotification),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.create(mockReq, mockRes);

      expect(mockNotificationService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Create notification successfully",
        data: mockNotification,
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        body: {
          ...mock.NOTIFICATION,
        },
        user: {
          ...mock.USER
        }
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        create: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.create(mockReq, mockRes);

      expect(mockNotificationService.create).toHaveBeenCalled();
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
        params: mockNotification.id,
        body: {
          ...mock.NOTIFICATION,
        },
        user: {
          ...mock.USER
        }
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        update: jest.fn().mockReturnValue(mockNotification),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.update(mockReq, mockRes);

      expect(mockNotificationService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Update notification successfully",
      });
    });

    it("should res.status(404) if notification not found", async () => {
      const mockReq = {
        params: 999,
        body: {
          ...mock.NOTIFICATION,
        },
        user: {
          ...mock.USER
        }
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        update: jest.fn().mockReturnValue(0),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.update(mockReq, mockRes);

      expect(mockNotificationService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id notification tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: mockNotification.id,
        body: {
          ...mock.NOTIFICATION,
        },
        user: {
          ...mock.USER
        }
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        update: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.update(mockReq, mockRes);

      expect(mockNotificationService.update).toHaveBeenCalled();
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
          id: mockNotification.id,
        },
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        destroy: jest.fn().mockReturnValue(mockNotification),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.destroy(mockReq, mockRes);

      expect(mockNotificationService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        status: `Delete notification successfully`,
      });
    });

    it("should res.status(404) if notification not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        destroy: jest.fn().mockReturnValue(null),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.destroy(mockReq, mockRes);

      expect(mockNotificationService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id notification tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: {
          id: mockNotification.id,
        },
      };
      const mockRes = mock.RES;
      const mockNotificationService = {
        destroy: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new notificationController(mockNotificationService);
      await controller.destroy(mockReq, mockRes);

      expect(mockNotificationService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });
});
