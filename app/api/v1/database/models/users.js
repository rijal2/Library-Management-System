'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const roles = require('./roles');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: {
      //   args: [ true ],
      //   msg: 'Nama sudah terdaftar'
      // },
      validate: {
        notNull: {
          args: [ true ],
          msg: "nama User tidak boleh Null"
        },
        notEmpty: {
          msg: 'nama tidak boleh kosong'
        },
        len: {
          args: [5, 50],
          msg: "nama User harus memiliki jumlah karakter antara min. 5 karakter dan max. 50 karakter"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        notNull: {
          args: [ true ],
          msg: "Email tidak boleh Null"
        },
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        },
        isEmail: {
          args: [ true ],
          msg: "Gunakan format email yang benar. example@gmail.com"
        }
      },
      unique: {
        msg: `Email sudah terdaftar`
      }
      // unique: {
      //   args: true,
      //   msg: 'Email sudah terdaftar'
      // }, //Unique gak work. So validasinya di 'service' aja
    },
    hashPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [ true ],
          msg: "Password tidak boleh Null"
        },
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        },
        len: {
          args: [5, 30],
          msg: "Password minimal 5 karakter dan maksimal 30 karakter"
        },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [ true ],
          msg: "Status tidak boleh Null"
        },
        notEmpty: {
          msg: 'Status tidak boleh kosong'
        },
        isIn: {
          args: [ 'aktif', 'tidak aktif' ],
          defaultValue: 'tidak aktif',
          msg: "Tentukan Status user sesuai dengan pilihan yang kami sediakan"
        }
      }
    },
    roleId: {
      type: DataTypes.NUMBER,
      foreignKey: true,
      allowNull: false,
      validate: {
        notNull: {
          args: [ true ],
          msg: "Role Id tidak boleh Null"
        },
        notEmpty: {
          msg: 'Role Id tidak boleh kosong'
        },
        isIn: {
          args: [ [2, 3, 4]],
          defaultValue: 3,
          msg: 'Silahkan Role pilih sessuai abcd berikut'
        }

      },
    },
    otp: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: async (users) => {
         if (users.hashPassword) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          const pwd = bcrypt.hashSync(users.hashPassword, salt);
          users.hashPassword = pwd;
          }
        }
      }
    }
  )

  users.prototype.checkPwd = async function (candidatePassword){
    const result = await bycript.compare(candidatePassword, this.hashPassword)
    return result
  }

  users.associate = function(models){
    users.belongsTo(models.roles, {
      foreignKey: 'roleId',
      as: 'roles'
    })

  }
  
  return users;
};