const createTokenUser = (user) => {
    return {
        userId: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        status: user.status,
        admin: user.publisher

    }

}

module.exports = {
    createTokenUser
}