/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const Sequelize = require("sequelize");

const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "TR7PjX9qYBVHF7AFRO4M",
  DB_HOST = "containers-us-west-117.railway.app",
  DB_NAME = "railway",
  DB_PORT = "6602",
  DB_URL = "postgresql://postgres:TR7PjX9qYBVHF7AFRO4M@containers-us-west-117.railway.app:6602/railway",
} = process.env;

const db = new Sequelize(DB_URL, {
  define: {
    timestamps: false
  }
})

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  db
};
