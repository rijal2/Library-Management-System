const { NotFoundError, BadRequestError, UnathenticatedError, UnauthorizedError } = require('../errors/exceptions')

const Model = require('../api/v1/database/models')
const { users, admins, roles } = Model.sequelize.models
const { createJwt, createTokenUser } = require('../utils')
const bcrypt = require('bcrypt')
const comparePassword = async (password, hashPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashPassword );
        console.log("isMatch =>>>" + isMatch)
        return isMatch;    
    } catch (error) {
        console.log(error)
    }
    return false
}

const signin = async (req) => {
    const { email, password } = req.body
    if(!email && !password) throw new BadRequestError("Email dan Password tidak boleh kosong")

    const checkEmail = await users.findOne({
        where: {email},
        attributes: ["id", "name", "email", "status", "roleId", "hashPassword"],
        include: [
            {
                model: roles,
                as: 'roles',
                attributes: ['role']
            }
        ]
    })

    if(!checkEmail) throw new UnauthorizedError('Email tidak sesuai')
    if(checkEmail.status == "tidak aktif") throw new BadRequestError('Akun Anda sudah tidak aktif. Kami telah mengirim OTP untuk memulihkan akun Anda. Silahkan cek email Anda')
    console.log(checkEmail.dataValues)
    const check = await users.prototype.checkPwd(password, checkEmail.hashPassword)
    if(!check) throw new UnauthorizedError('Password Salah')

    const token = createJwt({ payload: createTokenUser(checkEmail.dataValues) })

    return token
}

module.exports = {
    signin
}
