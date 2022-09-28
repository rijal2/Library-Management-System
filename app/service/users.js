const Model = require('../models')
const { users } = Model.sequelize.models

const addUser = async (req)=> {
    const { name, email, password, role } = req.body
    const result = await users.create({name, email, password, role})

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