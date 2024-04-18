'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saran extends Model {
   
    static associate(models) {
      Saran.belongsTo(models.TingkatStres, { foreignKey: 'id' });
    }
  }
  Saran.init({
    saran: DataTypes.STRING,
    idstres: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Saran',
  });
  return Saran;
};