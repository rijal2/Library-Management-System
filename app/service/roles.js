const Model = require('../api/v1/database/models')
const { roles } = Model.sequelize.models

const createRoles = async (req) => {
    const { name } = req.body;
    console.log(name);
    console.log(typeof(name));
    let fixName;
    typeof(name) === Number ? fixName = parseInt(name) : fixName = name;
    console.log(fixName);
    const result = await roles.create({ name: fixName })
    
    return result
}

module.exports = {
    createRoles,
    
}