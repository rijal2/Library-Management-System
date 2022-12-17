const Model = require('../api/v1/database/models')
const { users, roles } = Model.sequelize.models
const { NotFoundError, BadRequestError } = require('../errors/exceptions')

const addUser = async (req)=> {
    const { name, email, hashPassword, roleId, status } = req.body
    
    const otp = Math.floor(Math.random() * 9999)
    
    const [checkEmail, role ] = await Promise.all(
        [
            // users.findOne({where: {email}}),
            roles.findOne({where: {id: roleId}})
        ]
    )
    // if(checkEmail) throw new BadRequestError(`Email ${email} sudah terdaftar. Silahkan login disini`)    
    // if(!role) throw new BadRequestError(`Email ${email} sudah terdaftar. Silahkan login disini`)    

    const create = await users.create({ name, email, hashPassword, roleId: parseInt(roleId), status, otp})
        
    const result = {
        name: create.name,
        email: create.email,
        status: create.status,
        // role: role.role
    }
    return result
}

const getAllUser = async (req) => {
    const result = await users.findAll({
        include: [{
            model: roles,
            as: 'roles',
            attributes: ["id", "role"]
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