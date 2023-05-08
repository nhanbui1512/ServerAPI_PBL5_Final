'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class warnings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    warnings.init({
        idUser: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'warnings',
    });
    return warnings;
};