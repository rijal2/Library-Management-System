const Model = require('../api/v1/database/models')
const { users, roles } = Model.sequelize.models
const { NotFoundError } = require('../errors/exceptions')

const addUser = async (req)=> {
    const { name, email, hashPassword, roleId, status } = req.body
    console.log("checkEmail")
    const checkEmail = await users.findOne({where: {email}})
    if(checkEmail) throw new NotFoundError(`Email ${email} sudah terdaftar. Silahkan login disini`)
    
    const otp = Math.floor(Math.random() * 9999)
    console.log(otp)
    const result = await users.create({name, email, hashPassword, roleId, status, otp})

    return result
}

const getAllUser = async (req) => {
    const result = await users.findAll()
    return result
}

module.exports = {
    addUser,
    getAllUser
}