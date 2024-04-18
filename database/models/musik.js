'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Musik extends Model {
    static associate(models) {
      Musik.belongsTo(models.TingkatStres, { foreignKey: 'id_stres' }); // Menggunakan 'id_stres' sebagai foreign key
    }
  }
  
  Musik.init({
    video: DataTypes.STRING,
    catatan: DataTypes.STRING,
    id_stres: DataTypes.INTEGER // Nama kolom foreign key di tabel Musik
  }, {
    sequelize,
    modelName: 'Musik',
  });
  
  return Musik;
};
