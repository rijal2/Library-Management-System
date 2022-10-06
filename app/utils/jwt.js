const jwt = require('jsonwebtoken')
const { jwtExpiration, jwtRefreshExpiration, jwtSecret, jwtRefreshSecret } = require('../config')

const createJwt = ({payload}) => {
    const token = jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiration})
    return token
}

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret)

const createRefreshJwt = ({payload}) => {
    const token = jwt.sign(payload, jwtRefreshSecret, {expiresIn: jwtRefreshExpiration})
    return token
}
const isRefreshTokenValid = ({token}) => jwt.verify(token, jwtRefreshSecret)

module.exports = {
    createJwt,
    createRefreshJwt,
    isTokenValid,
    isRefreshTokenValid
}