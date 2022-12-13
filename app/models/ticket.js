'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Booking, {
        foreignKey: "id_booking"
      });
    }
  }
  Ticket.init({
    id_booking: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    dates: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};