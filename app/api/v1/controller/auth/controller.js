const { signin } = require('../../../../service/auth')
const { StatusCodes } = require('http-status-codes')

const signinApp = async (req, res, next) => {
    try {
        const result = await signin(req)

        res.status(StatusCodes.OK).json({
            success: true,
            data: { token: result}
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signinApp
}