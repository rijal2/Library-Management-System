module.exports = {
    roles: (value, err) => {
        if(value.length > 25) {
            return err.message(`Nama role tidak boleh lebih dari 25 karakter`)
        }
        if(value.length < 3) {
            return err.message(`Nama role tidak boleh kurang dari 3 karakter`)
        }
    }
}