/**
 * @file contains authentication request handler and its business logic
 * @author GoTravel Kelompok 5 FSW 2
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const cloudinary = require("../../../../config/cloudinary");
const SALT = 10;

function createTokenGoogle(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

//FUNCTION UNTUK ME ENCRYPT PASSWORD SAAT REGISTRASI
function encryptPassword(password) {
  try {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT, (err, encryptedPassword) => {
        if (!!err) {
          reject(err);
          return;
        }

        resolve(encryptedPassword);
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message,
    });
  }
}

// FUNCTION CHECK PASSWORD
function checkPassword(encryptedPassword, password) {
  try {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
        if (!!err) {
          reject(err);
          return;
        }

        resolve(isPasswordCorrect);
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message,
    });
  }
}

//FUNCTION membuat token yg akan di kirimakan ke client
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  listUser = async (req, res) => {
    try {
      const listUser = await this.userService.list();
      res.status(200).json({
        status: "OK",
        data: { users: listUser },
        meta: { count: listUser.length },
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  listMember = async (req, res) => {
    try {
      const listMember = await this.userService.listByRole("member");
      res.status(200).json({
        status: "OK",
        data: { users: listMember },
        meta: { count: listMember.length },
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  listAdmin = async (req, res) => {
    try {
      const listAdmin = await this.userService.listByRole("admin");
      res.status(200).json({
        status: "OK",
        data: { users: listAdmin },
        meta: { count: listAdmin.length },
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  register = async (req, res) => {
    try {
      const no_ktp = req.body.no_ktp;
      const address = req.body.address;
      const date_of_birth = req.body.date_of_birth;
      const name = req.body.name;
      const email = req.body.email;
      const username = req.body.username;
      const gender = req.body.gender;
      const password = await encryptPassword(req.body.password);
      const role = "member";
      const image = "";
      const user = await this.userService.create({
        no_ktp,
        gender,
        date_of_birth,
        address,
        email,
        password,
        name,
        username,
        image,
        role,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  createAdmin = async (req, res) => {
    try {
      const no_ktp = req.body.no_ktp;
      const address = req.body.address;
      const date_of_birth = req.body.date_of_birth;
      const name = req.body.name;
      const email = req.body.email;
      const username = req.body.username;
      const gender = req.body.gender;
      const password = await encryptPassword(req.body.password);
      const role = "admin";
      const image = "";
      const user = await this.userService.create({
        no_ktp,
        gender,
        date_of_birth,
        address,
        email,
        password,
        name,
        username,
        image,
        role,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const no_ktp = req.body.no_ktp;
      const gender = req.body.gender;
      const date_of_birth = req.body.date_of_birth;
      const address = req.body.address;
      const email = req.body.email;
      const name = req.body.name;
      const username = req.body.username;
      const image = req.body.image;
      const password = !req.body.password
        ? req.user.password
        : await encryptPassword(req.body.password);
      if (image != null || image != undefined) {
        const oldimage = req.user.image;

        if (oldimage !== null) {
          const getImageID = oldimage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`profile-pictures/${getImageID}`);
        }

        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(
          file,
          { folder: "profile-pictures" },
          function (err, result) {
            if (!!err) {
              res.status(400).json({
                status: "Update Failed",
                errors: err.message,
              });
              return;
            }

            const image = result.url;

            this.userService
              .update(req.user.id, {
                no_ktp: no_ktp,
                gender: gender,
                date_of_birth: date_of_birth,
                address: address,
                email: email,
                name: name,
                username: username,
                password: password,
                image: image,
              })
              .then(() => {
                res.status(200).json({
                  status: "updated",
                });
              })
              .catch((err) => {
                res.status(422).json({
                  status: "FAIL",
                  message: err.message,
                });
              });
          }
        );
        return;
      }
      const user = await this.userService.update(req.user.id, {
        no_ktp: no_ktp,
        gender: gender,
        date_of_birth: date_of_birth,
        address: address,
        email: email,
        name: name,
        username: username,
        password: password,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Update User successfully",
        data : user
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = req.params.id;

      const user = await this.userService.delete({
        where: { id },
      });

      //pengecekan username
      if (!user) {
        res.status(404).json({ message: "id user tidak ditemukan" });
        return;
      }

      res.status(200).json({
        status: "SUCCESS",
        message: `Delete User successfully`,
      });
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  };

  login = async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await this.userService.findOne({
        where: { username },
      });

      //pengecekan username
      if (!user) {
        res.status(404).json({ message: "Username tidak ditemukan" });
        return;
      }

      //pengecekan password yang telah di compare dari method checkPassword()
      const isPasswordCorrect = await checkPassword(user.password, password);
      //PENGECEKAN JIKA PASSWORD SALAH
      if (!isPasswordCorrect) {
        res.status(409).json({ message: "Password salah!" });
        return;
      }

      //TOKEN DI BUAT DARI METHOD createToken(), LALU DI MASUKUAN KE DALAM KE DALAM TOKEN
      const token = createToken({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      //RESPON YANG DI TAMPILKAN KE CLIENT
      res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username,
        token,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        message: "Login Success",
      });
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  };

  whoAmI = async (req, res) => {
    res.status(200).json(req.user);
  };

  authorize = async (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      //PENCARIAN DATA USER BERDASARKAN DARI TOKEN ID YANG LOGIN
      const user = await this.userService.findByPk(tokenPayload.id);
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({
        message: err.message,
      });
    }
  };

  verifyRoles = async (req, res, next, role) => {
    try {
      const userRole = req.user.role;
      if (!userRole)
        return res.status(401).json({
          status: "FAIL",
          message: "you don't have role",
        });
      const result = role.includes(userRole);
      if (!result)
        return res.status(401).json({
          status: "FAIL",
          message: "you don't have permission",
        });
      next();
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  };

  authorizeUser = (req, res, next) => {
    this.verifyRoles(req, res, next, ["member", "admin", "superAdmin"]);
  };

  authorizeAdmin = (req, res, next) => {
    this.verifyRoles(req, res, next, ["admin", "superAdmin"]);
  };

  authorizeSuperAdmin = (req, res, next) => {
    this.verifyRoles(req, res, next, ["superAdmin"]);
  };

  handleGoogleLoginOrRegister = async (req, res) => {
    const { token } = req.body;
    console.log(token);
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
  
      const { email, name } = ticket.getPayload();
      const role = "member";
  
      console.log(ticket.getPayload());
  
      let user = await this.userService.findOne({ where: { email: email } });
      if (!user) user = await this.userService.create({ email, name, role });
  
      const accessToken = createTokenGoogle(user);
  
      res.status(201).json({ accessToken });
    } catch (err) {
      res.status(401).json({ error: { name: err.name, message: err.message } });
    }
  }
}

module.exports = { UserController, encryptPassword, createToken };
// module.exports = {
//   list(req, res) {
//     UserServices.list()
//       .then(({ data, count }) => {
//         res.status(200).json({
//           status: "OK",
//           data: { user: data },
//           meta: { total: count },
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },

//   listMember(req, res) {
//     UserServices.listByRole("member")
//       .then(({ data, count }) => {
//         res.status(200).json({
//           status: "OK",
//           data: { user: data },
//           meta: { total: count },
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },

//   listAdmin(req, res) {
//     UserServices.listByRole("admin")
//       .then(({ data, count }) => {
//         res.status(200).json({
//           status: "OK",
//           data: { user: data },
//           meta: { total: count },
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },
//   encryptPassword,
//   //FUNCTION UNTUK REGISTER
//   async register(req, res) {
//     try {
//       const no_ktp = "";
//       const address = "";
//       const date_of_birth = req.body.date_of_birth;
//       const name = req.body.name;
//       const email = req.body.email;
//       const username = req.body.username;
//       const gender = req.body.gender;
//       const password = await encryptPassword(req.body.password);
//       const role = "member";
//       const image = "";
//       const user = await UserServices.create({
//         no_ktp,
//         gender,
//         date_of_birth,
//         address,
//         email,
//         password,
//         name,
//         username,
//         image,
//         role,
//       });
//       res.status(201).json({
//         id: user.id,
//         email: user.email,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "FAIL",
//         message: error.message,
//       });
//     }
//   },

//   async createAdmin(req, res) {
//     try {
//       const no_ktp = req.body.no_ktp;
//       const address = req.body.address;
//       const date_of_birth = req.body.date_of_birth;
//       const name = req.body.name;
//       const email = req.body.email;
//       const username = req.body.username;
//       const gender = req.body.gender;
//       const password = await encryptPassword(req.body.password);
//       const role = "admin";
//       const image = "";
//       const user = await UserServices.create({
//         no_ktp,
//         gender,
//         date_of_birth,
//         address,
//         email,
//         password,
//         name,
//         username,
//         image,
//         role,
//       });
//       res.status(201).json({
//         id: user.id,
//         email: user.email,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "FAIL",
//         message: error.message,
//       });
//     }
//   },

//   async updateUser(req, res) {
//     const no_ktp = req.body.no_ktp;
//     const gender = req.body.gender;
//     const date_of_birth = req.body.date_of_birth;
//     const address = req.body.address;
//     const email = req.body.email;
//     const name = req.body.name;
//     const username = req.body.username;
//     const image = req.body.image;
//     const password = !req.body.password
//       ? req.user.password
//       : await encryptPassword(req.body.password);

//     if (image !== null || undefined) {
//       const oldimage = req.user.image;

//       if (oldimage !== null) {
//         const getImageID = oldimage.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(`profile-pictures/${getImageID}`);
//       }

//       const fileBase64 = req.file.buffer.toString("base64");
//       const file = `data:${req.file.mimetype};base64,${fileBase64}`;

//       cloudinary.uploader.upload(
//         file,
//         { folder: "profile-pictures" },
//         function (err, result) {
//           if (!!err) {
//             res.status(400).json({
//               status: "Update Failed",
//               errors: err.message,
//             });
//             return;
//           }

//           const image = result.url;

//           UserServices.update(req.user.id, {
//             no_ktp: no_ktp,
//             gender: gender,
//             date_of_birth: date_of_birth,
//             address: address,
//             email: email,
//             name: name,
//             username: username,
//             password: password,
//             image: image,
//           })
//             .then(() => {
//               res.status(200).json({
//                 status: "updated",
//               });
//             })
//             .catch((err) => {
//               res.status(422).json({
//                 status: "FAIL",
//                 message: err.message,
//               });
//             });
//         }
//       );
//       return;
//     }

//     UserServices.update(req.user.id, {
//       no_ktp: no_ktp,
//       gender: gender,
//       date_of_birth: date_of_birth,
//       address: address,
//       email: email,
//       name: name,
//       username: username,
//       password: password,
//     })
//       .then(() => {
//         res.status(200).json({
//           status: "SUCCESS",
//           message: "Update User successfully",
//         });
//       })
//       .catch((err) => {
//         res.status(422).json({
//           status: "FAIL",
//           message: err.message,
//         });
//       });
//   },

//   //user Delete

//   async userDelete(req, res) {
//     try {
//       const id = req.params.id;

//       const user = await UserServices.delete({
//         where: { id },
//       });

//       //pengecekan username
//       if (!user) {
//         res.status(404).json({ message: "id user tidak ditemukan" });
//         return;
//       }

//       res.status(200).json({
//         status: `Delete User successfully`,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({
//         message: error.message,
//       });
//     }
//   },

//   //FUNCTION LOGIN
//   async login(req, res) {
//     try {
//       const username = req.body.username;
//       const password = req.body.password;

//       const user = await UserServices.findOne({
//         where: { username },
//       });

//       //pengecekan username
//       if (!user) {
//         res.status(404).json({ message: "Username tidak ditemukan" });
//         return;
//       }

//       //pengecekan password yang telah di compare dari method checkPassword()
//       const isPasswordCorrect = await checkPassword(user.password, password);
//       //PENGECEKAN JIKA PASSWORD SALAH
//       if (!isPasswordCorrect) {
//         res.status(401).json({ message: "Password salah!" });
//         return;
//       }

//       //TOKEN DI BUAT DARI METHOD createToken(), LALU DI MASUKUAN KE DALAM KE DALAM TOKEN
//       const token = createToken({
//         id: user.id,
//         email: user.email,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       });

//       //RESPON YANG DI TAMPILKAN KE CLIENT
//       res.status(201).json({
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         token,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//         message: "Login Success",
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({
//         message: error.message,
//       });
//     }
//   },

//   //FUNCTION UNTUK MENGETAHUI SIAPA YANG SEDANG MENGAKSES DATA
//   async whoAmI(req, res) {
//     try {
//       res.status(200).json(req.user);
//     } catch (error) {
//       res.status(401).json({
//         message: error.message,
//       });
//     }
//   },

//   //FUNCTION UNTUK PENGECEKAN SAAT LOGIN
//   async authorize(req, res, next) {
//     try {
//       const bearerToken = req.headers.authorization;
//       const token = bearerToken.split("Bearer ")[1];
//       const tokenPayload = jwt.verify(
//         token,
//         process.env.JWT_SIGNATURE_KEY || "Rahasia"
//       );

//       //PENCARIAN DATA USER BERDASARKAN DARI TOKEN ID YANG LOGIN
//       req.user = await UserServices.findByPk(tokenPayload.id);
//       next();
//     } catch (err) {
//       console.error(err);
//       res.status(401).json({
//         message: "Unauthorized",
//       });
//     }
//   },

//   verifyRoles(...allowedRoles) {
//     try {
//       return (req, res, next) => {
//         userRole = req.user.role;
//         console.log(userRole);
//         if (!userRole)
//           return res.status(401).json({
//             status: "FAIL",
//             message: "you don't have role",
//           });
//         const rolesArray = [...allowedRoles];
//         const result = rolesArray.includes(userRole);
//         if (!result)
//           return res.status(401).json({
//             status: "FAIL",
//             message: "you don't have permission",
//           });
//         next();
//       };
//     } catch (error) {
//       res.status(401).json({
//         message: error.message,
//       });
//     }
//   },
// };
