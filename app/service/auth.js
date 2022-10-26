const { NotFoundError, BadRequestError, UnathenticatedError, UnauthorizedError } = require('../errors/exceptions')
const { StatusCodes } = require('http-status-codes')
const Model = require('../api/v1/database/models')
const { users, admins } = Model.sequelize.models
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

    const checkEmail = await users.findOne({where: {email}, attributes: ["id", "name", "email", "status", "roleId", "hashPassword"]})
    if(!checkEmail) throw new UnauthorizedError('Email atau Password tidak sesuai')
    
    const check = await comparePassword(password, checkEmail.hashPassword)
    if(!check) throw new UnauthorizedError('Password Salah')
    
    let result = { ...checkEmail}
    if(checkEmail.roleId === 3) {
        const check = await admins.findOne({where: {userId: checkEmail.id}})
        return result.dataValues.publisher = check.userPublisher
    } else {
        result.dataValues.publisher = "-"
    }

    const token = createJwt({ payload: createTokenUser(result.dataValues) })

    return token
}

module.exports = {
    signin
}
