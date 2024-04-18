  'use strict';
  const { Model } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class LatihanGerakan extends Model {
      static associate(models) {
        // Mengaitkan LatihanGerakan dengan TingkatStres
        LatihanGerakan.belongsTo(models.TingkatStres, { foreignKey: 'id' });
      }
    }

    LatihanGerakan.init({
      video: DataTypes.STRING,
      catatan: DataTypes.STRING,
      id_stres: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'LatihanGerakan',
    });

    return LatihanGerakan;
  };
