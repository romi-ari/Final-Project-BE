'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Receipt.init({
    file_url: DataTypes.STRING,
    cloudinary_id: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Receipt',
  });
  return Receipt;
};