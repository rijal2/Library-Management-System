const { UnathenticatedError, UnauthorizedError } = require('../exceptions')
const { isTokenValid } = require('../../utils')
const Model = require('../../api/v1/database/models')
const { users, admins, roles } = Model.sequelize.models

const authenticatedUser = async (req, res, next) => {
    try {
        let token;
        
        const authHeader = req.headers.authorization
        if( authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1]
        }

        if(!token) throw new UnathenticatedError('Autentikasi tidak valid')

        const payload = isTokenValid({ token })
        // const nameRole = await roles.findOne({where: {id: roleId}, attribute: ["id", "name"]})
        // console.log("nameRole =>>> " + nameRole);
        req.user = {
            id: payload.userId,
            name: payload.name,
            email: payload.email,
            status: payload.status,
            role: payload.roleId,
            publisher: payload.admin
        }
        console.log("req.user.role =>>> " + req.user.role)

        next()

    } catch (error) {
        next()
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log("rolesnya ==>> " + roles + " / type ==>> " + typeof(roles) + " " + roles.includes(req.user.role))
        console.log("roles di req.user ==>> " + req.user.role + " / type ==>> " + typeof(req.user.role))
      if (!roles.includes(req.user.role))
        throw new UnauthorizedError(
          `Tidak memiliki otoritas atau ijin untuk akses menggunakan route ini`
        );
      next();
    };
};

module.exports = {
    authenticatedUser,
    authorizeRoles
}