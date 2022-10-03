const { addUser } = require('../../../../service/users')
const { StatusCodes } = require('http-status-codes')

const createUser = async (req, res, next) => {
    try {
        const result = await addUser(req)

        res.status(StatusCodes.CREATED).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser
}