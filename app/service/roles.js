const Model = require('../api/v1/database/models');
// const users = require('../api/v1/database/models/users');
const { roles, users } = Model.sequelize.models
const { NotFoundError, BadRequestError } = require('../errors/exceptions')

const createRoles = async (req) => {
    const { role } = req.body;
    const checkName = await roles.findOne({where: {role}})
    if(checkName) throw new BadRequestError(`Role dengan jenis ${role} sudah terdaftar`)
    
    const result = await roles.create({ role })
    
    return result
}

const getAllRoles = async (req) => {
    const result = await roles.findAll({
        include: [
            {
                model: users,
                as: 'Detail Users',
                attributes: [ 'id', 'role' ]
            }
        ]
    })
    return result
}

const getRolesByPk = async (req) => {
    const { id } = req.params
    const result = await roles.findOne({where: {id}})
    if(!result) throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`)

    return result
}

const deleteRoles = async (req) => {
    const { id } = req.params
    const check = await roles.findOne({where: {id}})
    if(!check) throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`)
    
    await check.destroy()
    return check

}

const updateRoles = async (req) => {
    const { id } = req.params
    const { name } = req.body
    const check = await roles.findOne({where: {id}})
    if(!check) throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`)
    
    return check.update({name})
}

module.exports = {
    createRoles,
    getAllRoles,
    getRolesByPk,
    deleteRoles,
    updateRoles   
}