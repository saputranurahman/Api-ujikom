  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class LatihanPernafasan extends Model {
      static associate(models) {
        LatihanPernafasan.belongsTo(models.TingkatStres, { foreignKey: 'id' });
      }
    }
    LatihanPernafasan.init({
      video: DataTypes.STRING,
      catatan: DataTypes.STRING,
      id_stres: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'LatihanPernafasan',
    });
    return LatihanPernafasan;
  };