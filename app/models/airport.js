"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        as: "FromAirport",
        foreignKey: "from_airport_id",
      });
      this.hasMany(models.Flight, {
        as: "ToAirport",
        foreignKey: "to_airport_id"
      });
    }
  }
  Airport.init(
    {
      name: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
