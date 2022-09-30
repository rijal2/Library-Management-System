const { createRoles } = require('../../../../service/roles')

const create = async (req, res, next) => {
 try {
    const result = await createRoles(req)

    res.status(200).json({
        msg: true,
        data: result
    })
 } catch (error) {
    next(error)
 }
}

module.exports = {
    create
}