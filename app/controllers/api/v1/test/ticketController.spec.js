const ticketController = require("../ticketController");
const mock = require("../../../../../test/mock");

describe("ticketController", () => {
  const mockTicket = {
    ...mock.TICKET,
    Booking: {
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
    },
  };

  const mockTicket2 = {
    ...mock.TICKET,
    id_booking: 2,
    Booking: {
      ...mock.BOOKING,
      id: 2,
      Flight: {
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
      },
    },
  };
  const mockTicketList = [mockTicket, mockTicket2];
  describe("#list", () => {
    it("should res.status(200) and return list of tickets if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockTicketService = {
        list: jest.fn().mockReturnValue(mockTicketList),
      };

      const controller = new ticketController(mockTicketService);
      await controller.list(mockReq, mockRes);

      expect(mockTicketService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { tickets: mockTicketList },
        meta: { count: mockTicketList.length },
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {};
      const mockRes = mock.RES;
      const mockTicketService = {
        list: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new ticketController(mockTicketService);
      await controller.list(mockReq, mockRes);

      expect(mockTicketService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#showById", () => {
    it("should res.status(200) and res.json ticket if success", async () => {
      const mockReq = {
        params: mockTicket.id,
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        findByPk: jest.fn().mockReturnValue(mockTicket),
      };

      const controller = new ticketController(mockTicketService);
      await controller.showById(mockReq, mockRes);

      expect(mockTicketService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: mockTicket,
      });
    });

    it("should res.status(404) if ticket not found", async () => {
      const mockReq = {
        params: 999,
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        findByPk: jest.fn().mockReturnValue(null),
      };

      const controller = new ticketController(mockTicketService);
      await controller.showById(mockReq, mockRes);

      expect(mockTicketService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id ticket tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: mockTicket.id,
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        findByPk: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new ticketController(mockTicketService);
      await controller.showById(mockReq, mockRes);

      expect(mockTicketService.findByPk).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#create", () => {
    it("should res.status(201) and res.json with ticket instance if success", async () => {
      const mockReq = {
        user: mock.USER,
        body: {
          id_booking : mockTicket.id_booking
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        create: jest.fn().mockReturnValue(mockTicket),
      };

      const controller = new ticketController(mockTicketService);
      await controller.create(mockReq, mockRes);

      expect(mockTicketService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Create ticket successfully",
        data: mockTicket,
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        user: mock.USER,
        body: {
          id_booking : mockTicket.id_booking
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        create: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new ticketController(mockTicketService);
      await controller.create(mockReq, mockRes);

      expect(mockTicketService.create).toHaveBeenCalled();
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
        params: mockTicket.id,
        user: mock.USER,
        body: {
          id_booking: 2,
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        update: jest.fn().mockReturnValue(mockTicket),
      };

      const controller = new ticketController(mockTicketService);
      await controller.update(mockReq, mockRes);

      expect(mockTicketService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "Update ticket successfully",
      });
    });

    it("should res.status(404) if ticket not found", async () => {
      const mockReq = {
        params: 999,
        user: mock.USER,
        body: {
          id_booking: 2,
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        update: jest.fn().mockReturnValue(0),
      };

      const controller = new ticketController(mockTicketService);
      await controller.update(mockReq, mockRes);

      expect(mockTicketService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id ticket tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: mockTicket.id,
        user: mock.USER,
        body: {
          id_booking: 2,
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        update: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new ticketController(mockTicketService);
      await controller.update(mockReq, mockRes);

      expect(mockTicketService.update).toHaveBeenCalled();
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
          id: mockTicket.id,
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        destroy: jest.fn().mockReturnValue(mockTicket),
      };

      const controller = new ticketController(mockTicketService);
      await controller.destroy(mockReq, mockRes);

      expect(mockTicketService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        status: `Delete ticket successfully`,
      });
    });

    it("should res.status(404) if ticket not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        destroy: jest.fn().mockReturnValue(null),
      };

      const controller = new ticketController(mockTicketService);
      await controller.destroy(mockReq, mockRes);

      expect(mockTicketService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id ticket tidak ditemukan",
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: {
          id: mockTicket.id,
        },
      };
      const mockRes = mock.RES;
      const mockTicketService = {
        destroy: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new ticketController(mockTicketService);
      await controller.destroy(mockReq, mockRes);

      expect(mockTicketService.destroy).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });
});
