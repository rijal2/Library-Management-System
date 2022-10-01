const Model = require('../api/v1/database/models')
const { roles } = Model.sequelize.models

const createRoles = async (req) => {
    const { name } = req.body;

    const result = await roles.create({ name })
    
    return result
}

module.exports = {
    createRoles,
    
}