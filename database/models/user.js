const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.TingkatStres, { foreignKey: 'IdStress' }); // Ubah menjadi IdStress
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "member"]
    },
    IdStress: DataTypes.INTEGER // Ubah menjadi IdStress
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
