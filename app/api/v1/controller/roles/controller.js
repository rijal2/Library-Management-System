const { createRoles, getAllRoles, getRolesByPk, deleteRoles, updateRoles } = require('../../../../service/roles')
const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
    
 try {
    const result = await createRoles(req)

    res.status(StatusCodes.CREATED).json({
        success: true,
        data: result
    })
 } catch (error) {
    next(error)
 }
}

const index  = async (req, res, next) => {
    try {
        const result = await getAllRoles(req)
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
        const result = await getRolesByPk(req)

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
        const result = await deleteRoles(req)
        res.status(StatusCodes.OK).json({
            success: true,
            data: result,
          });
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateRoles(req)

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
    index,
    find,
    destroy,
    update
}