const Model = require('../models')
const { users } = Model.sequelize.models

const addUser = async (req)=> {
    const { name, email, password, role } = req.body
    const result = await users.create({name, email, password, role})

    return result
}

module.exports = {
    addUser
}