const { addUser, getAllUser, getUserByPk, updateUsers, deleteUser } = require('../../../../service/users')
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

const index = async (req, res, next) => {
    try {
        const result = await getAllUser(req)
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getUserByPk(req)
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const result = await updateUsers(req)
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteUser(req)
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    index,
    find,
    updateUser,
    destroy
}