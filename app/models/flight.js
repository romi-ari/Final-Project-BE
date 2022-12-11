"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.belongsTo(models.Plane, {
        foreignKey: "id_plane",
      });
      Flight.belongsTo(models.Airport, {
        as: "FromAirport",
        foreignKey: "from_airport_id"
      });
      Flight.belongsTo(models.Airport, {
        as: "ToAirport",
        foreignKey: "to_airport_id"
      });
      this.hasMany(models.Booking, {
        foreignKey: "id_flight"
      });
    }
  }
  Flight.init(
    {
      id_plane: DataTypes.INTEGER,
      from_airport_id: DataTypes.INTEGER,
      to_airport_id: DataTypes.INTEGER,
      kelas: DataTypes.STRING,
      available_seats: DataTypes.INTEGER,
      price : DataTypes.INTEGER,
      arrival_time: DataTypes.STRING,
      departure_time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
