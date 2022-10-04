const Model = require('../api/v1/database/models')
const { users, roles } = Model.sequelize.models
const { NotFoundError, BadRequestError } = require('../errors/exceptions')

const addUser = async (req)=> {
    const { name, email, hashPassword, roleId, status } = req.body

    const checkRole = await roles.findOne({where: {id: roleId}})
    if(!checkRole) throw new NotFoundError(`Role dengan id ${roleId} tidak ditemukan`)

    const checkEmail = await users.findOne({where: {email}})
    if(checkEmail) throw new NotFoundError(`Email ${email} sudah terdaftar. Silahkan login disini`)
    
    const otp = Math.floor(Math.random() * 9999)
    
    const result = await users.create({name, email, hashPassword, roleId, status, otp})
    
    const lastResult = await users.findOne({
        where: {id : result.id},
        include: [{
            model: roles,
            as: 'role',
            attributes: ["id", "name"]
        }],
        attributes: ["id", "name", "email", "status"]
    })
    return lastResult
}

const getAllUser = async (req) => {
    const result = await users.findAll({
        include: [{
            model: roles,
            as: 'role',
            attributes: ["id", "name"]
        }],
        attributes: ["id", "name", "email", "status"]
    })
    return result
}

const getUserByPk = async (req) => {
    const { id } = req.params
    const result = await users.findOne({
        where: {id},
        include: [{
            model: roles,
            as: 'role',
            attributes: ["id", "name"]
        }],
        attributes: ["id", "name", "email", "status"]
    })
    
    if(!result) throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`)

    return result.dataValues
}

const updateUsers = async (req) => {
    const { id } = req.params
    const { name, email, status, roleId } = req.body

    const checkId = await users.findOne({
        where: {id},
        include: [{
            model: roles,
            as: 'role',
            attributes: ["id", "name"]
        }],
        attributes: ["id", "name", "email", "status"]
    })
    const checkEmail = await users.findOne({where: {email}})
    if(!checkId) throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`)
    if(checkEmail) throw new BadRequestError(`Email ${email} sudah terdaftar`)

    await checkId.update({name, email, status, roleId})
    return checkId
}

const deleteUser = async (req) => {
    const { id } = req.params
    const checkId = await users.findOne({
        where: {id},
        include: [{
            model: roles,
            as: 'role',
            attributes: ["id", "name"]
        }],
        attributes: ["id", "name", "email", "status"]
    })

    if(!checkId) throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`)
    await checkId.destroy()

    return checkId
}

module.exports = {
    addUser,
    getAllUser,
    getUserByPk,
    updateUsers,
    deleteUser
}