'use strict';
const {
  Model
} = require('sequelize');
const users = require('./users');
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: [ true ],
          msg: "nama role tidak boleh Null"
        },
        notEmpty: {
          args: [ true ],
          msg: "nama role tidak boleh kosong"
        },
        len: {
          args: [3, 11],
          msg: "nama role harus memiliki jumlah karakter antara 3 - 11"
        },
        isIn: {
          args: [[ 'owner', 'admin', 'publisher', 'participant']],
          defaultValue: 'participant',
          msg: 'Silahkan pilih sessuai abcd berikut'
        }
      }

    }
  })

  roles.associate = function(models){
    roles.hasMany(models.users, { as: 'Detail Users'})

  }
  return roles;
};