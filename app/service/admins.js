const Model = require('../api/v1/database/models')
const { admins, users } = Model.sequelize.models
const { NotFoundError, BadRequestError } = require('../errors/exceptions')

const createAdmin = async (req) => {
    const { name, email, hashPassword, status, publisher} = req.body;

    const checkEmail = await users.findOne({where: {email}})
    if(checkEmail) throw new BadRequestError(`Email ${email} sudah terdaftar. Silahkan login disini`)
    
    const otp = Math.floor(Math.random() * 9999)
    
    const result = await users.create({name, email, hashPassword, roleId: 3, status, otp})
    const admin = await admins.create({name, userId: result.id, userPublisher: publisher})
    
    return admin
}

const deleteAdmin = async (req) => {
    const { id } = req.body

    const checkId = await users.findOne({where: {id}})
    const checkAdmin = await admins.findOne({where: {userId: id}})
    if(!checkId || !checkAdmin) throw new NotFoundError(`User dengan id ${id} bukan admin`)

    await checkId.destroy()
    await checkAdmin.destroy()

    return checkId
}

module.exports = {
    createAdmin,
    deleteAdmin
}