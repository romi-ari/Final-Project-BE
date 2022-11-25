/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "atCUKU2tMHMlZqwS0eVo",
  DB_HOST = "containers-us-west-94.railway.app",
  DB_NAME = "railway",
  DB_PORT = "6742",
  DB_URL = "postgresql://postgres:atCUKU2tMHMlZqwS0eVo@containers-us-west-94.railway.app:6742/railway",
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
