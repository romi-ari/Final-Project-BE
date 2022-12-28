'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Flight, {
        foreignKey: "id_flight"
      });
      Booking.belongsTo(models.User, {
        foreignKey: "id_user"
      });
      this.hasOne(models.Ticket, {
        foreignKey: "id_booking"
      });
    }
  }
  Booking.init({
    id_flight: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    baggage: DataTypes.INTEGER,
    food: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    homephone: DataTypes.STRING,
    mobilephone: DataTypes.STRING,
    totalprice: DataTypes.INTEGER,
    booking_date: DataTypes.STRING,
    confirmation: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    trip_type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};