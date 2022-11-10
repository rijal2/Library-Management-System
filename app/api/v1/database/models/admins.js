'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define('admins', {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      userPublisher: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'admins',
    });

  Admins.associate = function(models){
    //make assiciate in here
    Admins.belongsTo(models.users, { foreignKey: 'userPublisher', as : 'detailUserPublisher' })
  }
  return Admins;
};