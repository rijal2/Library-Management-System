const { NotFoundError, BadRequestError, UnathenticatedError, UnauthorizedError } = require('../errors/exceptions')
const { StatusCodes } = require('http-status-codes')
const Model = require('../api/v1/database/models')
const { users } = Model.sequelize.models
const { createJwt, createTokenUser } = require('../utils')

const signin = async (req) => {
    const { email, password } = req.body
    if(!email && !password) throw new BadRequestError("Email dan Password tidak boleh kosong")

    const checkEmail = await users.findOne({where: {email: email}})
    if(!checkEmail) throw new UnauthorizedError('Email atau Password tidak sesuai')
    
}
