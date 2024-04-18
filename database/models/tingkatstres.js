'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TingkatStres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TingkatStres.hasMany(models.LatihanGerakan, {foreignKey: 'id_stres'});
      TingkatStres.hasMany(models.LatihanPernafasan, {foreignKey: 'id_stres'});
      TingkatStres.hasMany(models.Musik, {foreignKey: 'id_stres'});
      TingkatStres.hasMany(models.Saran, {foreignKey: 'id_stres'});
    }
  }
  TingkatStres.init({
    kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TingkatStres',
  });
  return TingkatStres;
};