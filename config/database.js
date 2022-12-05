/**
 * @file Manages database connection configuration.
 * @author Kelompok 5
 */

/** Destruct environment variable to get database configuration */
const Sequelize = require("sequelize");

const dotenv = require('dotenv')

dotenv.config();

const {
  DB_USERNAME = process.env.DB_USERNAME,
  DB_PASSWORD = process.env.DB_PASSWORD,
  DB_HOST = process.env.DB_HOST,
  DB_NAME = process.env.DB_NAME,
  DB_PORT = process.env.DB_PORT,
  DB_URL = process.env.DB_URL,
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
