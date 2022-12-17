const createTokenUser = (user) => {
    return {
        userId: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.roles.role

    }

}

module.exports = {
    createTokenUser
}