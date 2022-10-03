'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 25,
      min: 3
    }
    }, {
      sequelize,
      modelName: 'roles',
    });

  Roles.associate = function(models){
    //make assiciate in here
    Roles.hasMany(models.users, { as : 'users' })
  }
  return Roles;
};