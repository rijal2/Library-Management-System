const { addUser, getAllUser } = require('../service/users')

const create = async (req, res, next) => {
    try {
        const result = await addUser(req)

        res.status(200).json({
            msg: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllUser(req)

        res.status(200).json({
            msg: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index
}