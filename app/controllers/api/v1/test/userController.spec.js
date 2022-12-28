const { UserController, createToken } = require("../UserController");
const mock = require("../../../../../test/mock");

describe("UserController", () => {
  const mockUser = {
    ...mock.USER,
  };
  const mockUser2 = {
    ...mock.USER,
    role: "admin",
  };
  const mockUser3 = {
    ...mock.USER,
    role: "superAdmin",
  };
  const mockUserList = [mockUser, mockUser2, mockUser3];
  describe("#listUser", () => {
    it("should res.status(200) and return list of users if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockUserService = {
        list: jest.fn().mockReturnValue(mockUserList),
      };

      const controller = new UserController(mockUserService);
      await controller.listUser(mockReq, mockRes);

      expect(mockUserService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { users: mockUserList },
        meta: { count: mockUserList.length },
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {};
      const mockRes = mock.RES;
      const mockUserService = {
        list: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new UserController(mockUserService);
      await controller.listUser(mockReq, mockRes);

      expect(mockUserService.list).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#listMember", () => {
    it("should res.status(200) and return list of members if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockUserService = {
        listByRole: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService);
      await controller.listMember(mockReq, mockRes);

      expect(mockUserService.listByRole).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { users: mockUser },
        meta: { count: mockUser.length },
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {};
      const mockRes = mock.RES;
      const mockUserService = {
        listByRole: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new UserController(mockUserService);
      await controller.listMember(mockReq, mockRes);

      expect(mockUserService.listByRole).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#listAdmin", () => {
    it("should res.status(200) and return list of admins if success", async () => {
      const mockReq = {};
      const mockRes = mock.RES;
      const mockUserService = {
        listByRole: jest.fn().mockReturnValue(mockUser2),
      };

      const controller = new UserController(mockUserService);
      await controller.listMember(mockReq, mockRes);

      expect(mockUserService.listByRole).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "OK",
        data: { users: mockUser2 },
        meta: { count: mockUser2.length },
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {};
      const mockRes = mock.RES;
      const mockUserService = {
        listByRole: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new UserController(mockUserService);
      await controller.listMember(mockReq, mockRes);

      expect(mockUserService.listByRole).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#register", () => {
    it("should res.status(201) and return res.json with user instance if success", async () => {
      const mockReq = {
        body: {
          no_ktp: mockUser.no_ktp,
          gender: mockUser.gender,
          date_of_birth: mockUser.date_of_birth,
          address: mockUser.address,
          email: mockUser.email,
          password: "user",
          name: mockUser.name,
          username: mockUser.username,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService);
      await controller.register(mockReq, mockRes);

      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        id: mockUser.id,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something")
      const mockReq = {
        body: {
          no_ktp: mockUser.no_ktp,
          gender: mockUser.gender,
          date_of_birth: mockUser.date_of_birth,
          address: mockUser.address,
          email: mockUser.email,
          password: "user",
          name: mockUser.name,
          username: mockUser.username,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new UserController(mockUserService);
      await controller.register(mockReq, mockRes);

      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#createAdmin", () => {
    it("should res.status(201) and return res.json with user instance if success", async () => {
      const mockReq = {
        body: {
          no_ktp: mock.ADMIN.no_ktp,
          gender: mock.ADMIN.gender,
          date_of_birth: mock.ADMIN.date_of_birth,
          address: mock.ADMIN.address,
          email: mock.ADMIN.email,
          password: "admin",
          name: mock.ADMIN.name,
          username: mock.ADMIN.username,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(mock.ADMIN),
      };

      const controller = new UserController(mockUserService);
      await controller.createAdmin(mockReq, mockRes);

      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        id: mock.ADMIN.id,
        email: mock.ADMIN.email,
        createdAt: mock.ADMIN.createdAt,
        updatedAt: mock.ADMIN.updatedAt,
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        body: {
          no_ktp: mock.ADMIN.no_ktp,
          gender: mock.ADMIN.gender,
          date_of_birth: mock.ADMIN.date_of_birth,
          address: mock.ADMIN.address,
          email: mock.ADMIN.email,
          password: "admin",
          name: mock.ADMIN.name,
          username: mock.ADMIN.username,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new UserController(mockUserService);
      await controller.createAdmin(mockReq, mockRes);

      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#updateuser", () => {
    it("should res.status(200) if success", async () => {
      const mockReq = {
        user: mockUser,
        body: {
          no_ktp: mockUser.no_ktp,
          gender: mockUser.gender,
          date_of_birth: mockUser.date_of_birth,
          address: mockUser.address,
          email: mockUser.email,
          password: "user",
          name: mockUser.name,
          username: mockUser.username,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        update: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService);
      await controller.updateUser(mockReq, mockRes);

      expect(mockUserService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        message: "Update User successfully",
        data: mockUser,
      });
    });

    it("should res.status(400) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        user: mockUser,
        body: {
          no_ktp: mockUser.no_ktp,
          gender: mockUser.gender,
          date_of_birth: mockUser.date_of_birth,
          address: mockUser.address,
          email: mockUser.email,
          password: "user",
          name: mockUser.name,
          username: mockUser.username,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        update: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new UserController(mockUserService);
      await controller.updateUser(mockReq, mockRes);

      expect(mockUserService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: error.message,
      });
    });
  });

  describe("#deleteuser", () => {
    it("should res.status(200) on delete success", async () => {
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        delete: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService);
      await controller.deleteUser(mockReq, mockRes);

      expect(mockUserService.delete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "SUCCESS",
        message: `Delete User successfully`,
      });
    });

    it("should res.status(404) if user not found", async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        delete: jest.fn().mockReturnValue(null),
      };

      const controller = new UserController(mockUserService);
      await controller.deleteUser(mockReq, mockRes);

      expect(mockUserService.delete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "id user tidak ditemukan",
      });
    });

    it("should res.status(401) and return error message if failed", async () => {
      const error = new Error("Something");
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        delete: jest.fn().mockReturnValue(Promise.reject(error)),
      };

      const controller = new UserController(mockUserService);
      await controller.deleteUser(mockReq, mockRes);

      expect(mockUserService.delete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("#login", () => {
    it("should res.status(201) on login success", async () => {
      const mockReq = {
        body: {
          username: mockUser.username,
          password: "user",
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        findOne: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService);
      await controller.login(mockReq, mockRes);

      expect(mockUserService.findOne).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        email: mockUser.email,
        id: mockUser.id,
        username: mockUser.username,
        message: "Login Success",
        token: expect.any(String),
        updatedAt: mockUser.updatedAt,
        createdAt: mockUser.createdAt,
      });
    });

    it("should res.status(404) if username not found", async () => {
      const mockReq = {
        body: {
          username: "username",
          password: "user",
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        findOne: jest.fn().mockReturnValue(null),
      };

      const controller = new UserController(mockUserService);
      await controller.login(mockReq, mockRes);

      expect(mockUserService.findOne).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Username tidak ditemukan",
      });
    });

    it("should res.status(409) if the password is incorrect", async () => {
      const mockReq = {
        body: {
          username: mockUser.username,
          password: "",
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        findOne: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService);
      await controller.login(mockReq, mockRes);

      expect(mockUserService.findOne).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Password salah!",
      });
    });
  });

  describe("#whoAmI", () => {
    it("should res.status(200) and res.json with user instance if success", async () => {
      const mockReq = {
        user: mockUser,
      };
      const mockRes = mock.RES;

      const controller = new UserController();
      await controller.whoAmI(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        ...mockUser,
      });
    });
  });

  describe("#authorize", () => {
    it("should save user data in req and go to next if success", async () => {
      const token = createToken({
        id: mockUser.id,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      })
      const mockReq = {
        headers : {authorization: 'Bearer ' + token},
        user: jest.fn().mockReturnThis()
      };
      
      const mockRes = mock.RES;
      const mockUserService = {
        findByPk: jest.fn().mockReturnValue(mockUser),
      };

      const mockNext = jest.fn();

      const controller = new UserController(mockUserService);
      await controller.authorize(mockReq, mockRes, mockNext);

      expect(mockUserService.findByPk).toHaveBeenCalled();
      expect(mockReq.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("#verifyRoles", () => {
    it("should go to next if success", async () => {
      const mockReq = {
        user: mockUser
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.verifyRoles(mockReq, mockRes, mockNext, ["member", "admin", "superAdmin"]);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should res.status(201) and return message: you don't have role if the user does not have a role", async () => {
      const mockUser4 = {
        ...mock.USER,
        role : ""
      }
      const mockReq = {
        user: mockUser4
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.verifyRoles(mockReq, mockRes, mockNext, ["member", "admin", "superAdmin"]);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have role",
      });
    });

    it("should res.status(201) and return message: you don't have permissoon if user.role role not match", async () => {
      const mockReq = {
        user: mockUser
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.verifyRoles(mockReq, mockRes, mockNext, ["admin", "superAdmin"]);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have permission",
      });
    });
  });

  describe("#authorizeUser", () => {
    it("should go to next if success", async () => {
      const mockReq = {
        user: mockUser
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeUser(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should res.status(201) and return message: you don't have role if the user does not have a role", async () => {
      const mockUser4 = {
        ...mock.USER,
        role : ""
      }
      const mockReq = {
        user: mockUser4
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeUser(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have role",
      });
    });

    it("should still success if admin try to access", async () => {
      const mockReq = {
        user: mock.ADMIN
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeUser(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should still success if super admin try to access", async () => {
      const mockReq = {
        user: mock.SUPERADMIN
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeUser(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("#authorizeAdmin", () => {
    it("should go to next if success", async () => {
      const mockReq = {
        user: mock.ADMIN
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeAdmin(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should res.status(201) and return message: you don't have role if the user does not have a role", async () => {
      const mockUser4 = {
        ...mock.ADMIN,
        role : ""
      }
      const mockReq = {
        user: mockUser4
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have role",
      });
    });

    it("should res.status(401) if user try to access", async () => {
      const mockReq = {
        user: mock.USER
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have permission",
      });
    });

    it("should still success if super admin try to access", async () => {
      const mockReq = {
        user: mock.SUPERADMIN
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeAdmin(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("#authorizeSuperAdmin", () => {
    it("should go to next if success", async () => {
      const mockReq = {
        user: mock.SUPERADMIN
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeSuperAdmin(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should res.status(201) and return message: you don't have role if the user does not have a role", async () => {
      const mockUser4 = {
        ...mock.SUPERADMIN,
        role : ""
      }
      const mockReq = {
        user: mockUser4
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeSuperAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have role",
      });
    });

    it("should res.status(401) if user try to access", async () => {
      const mockReq = {
        user: mock.USER
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeSuperAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have permission",
      });
    });

    it("should still success if super admin try to access", async () => {
      const mockReq = {
        user: mock.ADMIN
      };
      
      const mockRes = mock.RES;

      const mockNext = jest.fn();

      const controller = new UserController();
      await controller.authorizeSuperAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: "you don't have permission",
      });
    });
  });

  describe("#handleGoogleLoginOrRegister", () => {
    it("should res.status(200) and return accesstoken if success", async () => {
      const mockReq = {
        body: {
          token : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhjMjdkYjRkMTNmNTRlNjU3ZDI2NWI0NTExMDA4MGI0ODhlYjQzOGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzE2MzM2NzMsImF1ZCI6IjEwNzUxNjY1Nzc5NjAtdTIxcjk5MzJtZnI1MXMxdWlxM21iYzV2NWsxNXV1OTYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgzNzUyMTY4MDIxMjM4NjE0MzkiLCJlbWFpbCI6InJheWhhbnB1dHJhMTAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIxMDc1MTY2NTc3OTYwLXUyMXI5OTMybWZyNTFzMXVpcTNtYmM1djVrMTV1dTk2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IlJheWhhbiBQdXRyYSBKYWZhbmRpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDRsdW9lX0hzbVMxNXRzR1hid0NxUlA3UzJKamNIUHBySW5DekRXanc9czk2LWMiLCJnaXZlbl9uYW1lIjoiUmF5aGFuIiwiZmFtaWx5X25hbWUiOiJQdXRyYSBKYWZhbmRpIiwiaWF0IjoxNjcxNjMzOTczLCJleHAiOjE2NzE2Mzc1NzMsImp0aSI6IjIwYzcxMzU3OWExMGM4NTJiZjcxOWRmYmY3OWZiODAwZjQyOGExYzcifQ.BssHg-GpGs72P4sxuIP-EzB0rJFTNSjbcUKQLNijSF6BQ6AFoNVJuANG7zbOQaXuHfjdslp4NSmuX98wzNDoF2n-j3Xnv12F069hr3e6xaJEWywMR50Exz2yZqPRZtvKkCzjEMOijvzesHefBwGbIzgLLiuMkLp29z4SIOXMa6o7DUnEjjl5KLjS1RJcCofB0I7Fn58d98DySeEDKjtuhpsqHzJvv0pTg_cfSIZ1OJp0rMurw0Koiuk9WROD5_Iv0wIM3bNJ4QvkjMlCzwcWvUuGFUPheqqPCPKltmFHusi4hXwlAyp5ho3_avj-B4znkLplq5NhH3LMbVnGSg3oCg"
        }
      };
      const mockRes = mock.RES;
      const mockUserService = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService);
      await controller.handleGoogleLoginOrRegister(mockReq, mockRes);

      expect(mockUserService.findOne).toHaveBeenCalled();
      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        accessToken: expect.any(String)
      });
    });
  });
  
});
