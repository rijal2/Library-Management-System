const Model = require('../api/v1/database/models')
const { users, roles } = Model.sequelize.models
const { NotFoundError, BadRequestError } = require('../errors/exceptions')

const addPublisherByOwner = async (req)=> {
    const { name, email, hashPassword, roleId, status } = req.body
    const otp = Math.floor(Math.random() * 9999)
    
    const [role] = await Promise.all(
        [
            roles.findOne({where: {id: roleId}})
        ]
    )
    
    const create = await users.create({ name, email, hashPassword, roleId: parseInt(roleId), status, otp})
        
    const result = {
        id: create.id,
        name: create.name,
        email: create.email,
        status: create.status,
        role: role.role
    }
    return result
}

const setStatusUsers = async (req) => {
    const { id, status } = req.params;
    
    let newStatus;

    if( status == "aktif" ){
        newStatus = 'tidak aktif'

    } else if (status == "tidak-aktif"){
        newStatus = 'aktif'

    } else {
        throw new BadRequestError('Salah input status user')
    }
    
    await users.update( { status: newStatus }, { where: {id} })
    const result = await users.findOne({where: {id}})

    return result
}

const addAdminByOwner = async (req) => {

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
            as: 'roles',
            attributes: ["id", "role"]
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
            as: 'roles',
            attributes: ["id", "role"]
        }]
    })

    if(!checkId) throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`)
    await checkId.destroy()

    return checkId
}

module.exports = {
    addPublisherByOwner,
    setStatusUsers,
    deleteUser,
    getAllUser,
    getUserByPk,
    updateUsers,
}