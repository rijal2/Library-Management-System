const Model = require('../../app/api/v1/database/models')
const { roles } = Model.sequelize.models

const createRoles = async (req) => {
    const { name } = req.body;
    
}