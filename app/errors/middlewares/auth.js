const { UnathenticatedError, UnauthorizedError } = require('../exceptions')
const { isTokenValid } = require('../../utils')

const authenticatedUser = async (req, res, next) => {
    try {
        let token;
        
        const authHeader = req.headers.authorization
        if( authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1]
        }

        if(!token) throw new UnathenticatedError('Autentikasi tidak valid')

        const payload = isTokenValid({ token })

        req.user = {
            id: payload.userId,
            name: payload.name,
            email: payload.email,
            status: payload.status,
            role: payload.roleId,
            publisher: payload.admin
        }

        next()

    } catch (error) {
        next()
    }
}