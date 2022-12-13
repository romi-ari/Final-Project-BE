/**
 * @file contains authentication request handler and its business logic
 * @author GoTravel Kelompok 5 FSW 2
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminServices = require("../../../services/adminService");
const SALT = 10;

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
    res.status(422).json({
      status: "FAIL",
      message: error.message,
    });
  }
}

//FUNCTION CHECK PASSWORD
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
    res.status(422).json({
      status: "FAIL",
      message: error.message,
    });
  }
}

//FUNCTION membuat token yg akan di kirimakan ke client
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

module.exports = {
  encryptPassword,
  //FUNCTION UNTUK REGISTER

  //FUNCTION UNTUK MEMBUAT ADMIN
  async createAdmin(req, res) {
    try {
      const email = req.body.email;
      const name = req.body.name;
      const username = req.body.username;
      const role = "admin";
      const password = await encryptPassword(req.body.password);
      const admin = await AdminServices.create({
        email,
        password,
        name,
        username,
        role,
      });
      res.status(201).json({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        username: admin.username,
        role: admin.role,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      });
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },

  async updateAdmin(req, res) {
    const email = req.body.email;
    const name = req.body.name;
    const username = req.body.username;
    const password = !req.body.password
      ? req.admin.password
      : await encryptPassword(req.body.password);
    AdminServices.update(req.admin.id, {
      email: email,
      name: name,
      username: username,
      password: password,
    })
      .then(() => {
        res.status(200).json({
          status: "SUCCESS",
          message: "Update Admin successfully",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  //FUNCTION LOGIN
  async loginAdmin(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const admin = await AdminServices.findOne({
        where: { username },
      });

      //pengecekan email
      if (!admin) {
        res.status(404).json({ message: "Username tidak ditemukan" });
        return;
      }

      //pengecekan password yang telah di compare dari method checkPassword()
      const isPasswordCorrect = await checkPassword(admin.password, password);
      //PENGECEKAN JIKA PASSWORD SALAH
      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Password salah!" });
        return;
      }

      //TOKEN DI BUAT DARI METHOD createToken(), LALU DI MASUKUAN KE DALAM KE DALAM TOKEN
      const token = createToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      });

      //RESPON YANG DI TAMPILKAN KE CLIENT
      res.status(201).json({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        username: admin.username,
        token,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      });
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },

  //FUNCTION UNTUK MENGETAHUI SIAPA YANG SEDANG MENGAKSES DATA
  async whoAmI(req, res) {
    try {
      res.status(200).json(req.admin);
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },

  //FUNCTION UNTUK PENGECEKAN SAAT LOGIN
  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      console.log(tokenPayload);

      if (tokenPayload.role != undefined) {
        //PENCARIAN DATA USER BERDASARKAN DARI TOKEN ID YANG LOGIN
        req.admin = await AdminServices.findByPk(tokenPayload.id);
        console.log(req.admin);
        next();
      } else {
        res.status(401).json({
          message: "You Cannot Access",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },
  verifyRoles(...allowedRoles) {
    try {
      return (req, res, next) => {
        userRole = req.admin.role;
        console.log(userRole);
        if (!userRole)
          return res.status(401).json({
            status: "FAIL",
            message: "you don't have role",
          });
        const rolesArray = [...allowedRoles];
        const result = rolesArray.includes(userRole);
        if (!result)
          return res.status(401).json({
            status: "FAIL",
            message: "you don't have permission",
          });
        next();
      };
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },
};
