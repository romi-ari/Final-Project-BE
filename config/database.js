/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const Sequelize = require("sequelize");

const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "CXhQGOoH3b8dwESl6lDn",
  DB_HOST = "containers-us-west-119.railway.app",
  DB_NAME = "railway",
  DB_PORT = "8051",
  DB_URL = "postgresql://postgres:CXhQGOoH3b8dwESl6lDn@containers-us-west-119.railway.app:8051/railway",
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
