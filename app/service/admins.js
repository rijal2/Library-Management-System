const Model = require('../api/v1/database/models')
const { admins, users } = Model.sequelize.models
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../errors/exceptions')

const createAdmin = async (req) => {
    const { name, email, password, status} = req.body;
    const { role } = req.user;
    console.log("roleId = " + role)
    console.log("req.user.userId = " + req.user.id)
    if(role !== 2) throw new UnauthorizedError("Anda tidak punya ijin untuk membuat admin")
    const checkEmail = await users.findOne({where: {email}})
    if(checkEmail) throw new BadRequestError(`Email ${email} sudah terdaftar. Silahkan login disini`)
    
    const otp = Math.floor(Math.random() * 9999)
    console.log("otp = " + otp)
    
    const result = await users.create({name, email, hashPassword: password, roleId: 3, status, otp})
    const admin = await admins.create({name, userId: result.id, userPublisher: req.user.id})
    
    const obj = {
        id: result.id,
        name: result.name,
        email: result.email,
        roleId: result.roleId,
        status: result.status,
        admin
    }
    return obj
}

const addAdmin = async (req) => {
    const { idAdmin } = req.params
    const { id, role } = req.user;
    
}

const getAllAdmin = async (req) => {
    const { id, role } = req.user;

    let result;
    if( role === 2){
        result = await admins.findAll({where: {userPublisher: id}, attributes: ["id", "name", "userId"]})
    }
    if( role === 1){
        result = await admins.findAll({
            attributes: ["id", "name", "userId", "userPublisher"],
            include: [
                {
                    model: users,
                    as: "detailUserPublisher",
                    foreignKey: 'userPublisher',
                    attributes: [
                        "id", "name", "email"
                    ]
                }
            ]
        })
        
    }

    return result
}

const getAdminByid = async (req) => {
    const { idAdmin } = req.params
    const { id, role } = req.user;

    let result;
    if( role === 2){
        const admin = await admins.findOne({
            where: {userPublisher: id, id: idAdmin},
            attributes: ["id", "userId", "userPublisher"],
            include: [
                {
                    model: users,
                    as: "detailUserAdmin",
                    foreignKey: 'userId',
                    attributes: [
                        "id", "name", "email"
                    ]
                }
            ]
        })
        if(!admin) throw new NotFoundError("Admin yang anda cari tidak ditemukan")
        result = admin
    }
    if( role === 1){
        const admin = await admins.findOne({
            where: {id: idAdmin},
            attributes: ["id", "userId", "userPublisher"],
            include: [
                {
                    model: users,
                    as: "detailUserAdmin",
                    foreignKey: 'userId',
                    attributes: [
                        "id", "name", "email"
                    ]
                },
                {
                    model: users,
                    as: "detailUserPublisher",
                    foreignKey: 'userPublisher',
                    attributes: [
                        "id", "name", "email"
                    ]
                }
            ]
        })
        if(!admin) throw new NotFoundError("Admin yang anda cari tidak ditemukan")
        result = admin
        
    }

    return result
}

const deleteAdmin = async (req) => {
    const { id, roleId } = req.body

    const checkId = await users.findOne({where: {id}})
    const checkAdmin = await admins.findOne({where: {userId: id}})
    if(!checkId && checkId.roleId !== 3 || !checkAdmin) throw new NotFoundError(`User dengan id ${id} bukan admin`)

    await checkId.destroy()
    await checkAdmin.destroy()

    return checkId
}

module.exports = {
    createAdmin,
    deleteAdmin,
    getAllAdmin,
    getAdminByid
}