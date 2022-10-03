'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users',{
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value.length <= 3 || value.length >= 25) {
            throw new Error("name min. 3 character and max. 25 character");
          }
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    hashPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    otp: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'users',
  })
  
  Users.associate = function(models){
    //make assiciate in here
    Users.belongsTo(models.roles, { as : 'role' })
  }

  return Users;
};