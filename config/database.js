/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const Sequelize = require("sequelize");

const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "Cxh7NhqPxJhy7QHrVk8k",
  DB_HOST = "containers-us-west-128.railway.app",
  DB_NAME = "railway",
  DB_PORT = "5693",
  DB_URL = "postgresql://postgres:Cxh7NhqPxJhy7QHrVk8k@containers-us-west-128.railway.app:5693/railway",
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
