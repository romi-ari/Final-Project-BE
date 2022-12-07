'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whislist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Whislist.init({
    id_user: DataTypes.INTEGER,
    id_flight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Whislist',
  });
  return Whislist;
};