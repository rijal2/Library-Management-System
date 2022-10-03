const Model = require('../api/v1/database/models')
const { roles } = Model.sequelize.models
const { NotFoundError } = require('../errors/exceptions')

const createRoles = async (req) => {
    const { name } = req.body;

    const result = await roles.create({ name })
    
    return result
}

const getAllRoles = async (req) => {
    const result = await roles.findAll()
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