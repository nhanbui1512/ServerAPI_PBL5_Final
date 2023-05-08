'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    old: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    phoneNumber: DataTypes.TEXT, cartNumberPlates: DataTypes.TEXT,
    access: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};