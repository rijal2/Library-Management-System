const { createAdmin, deleteAdmin, getAllAdmin, getAdminByid } = require('../../../../service/admins')
const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
    try {
        const result = await createAdmin(req)
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
        const result = await getAllAdmin(req)
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
        const result = await getAdminByid(req)
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
        const result = await deleteAdmin(req)
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    destroy,
    index,
    find
}