const Model = require('../models');
const { Book } = Model.sequelize.models
// const { categories, posts, users } = Model.sequelize.models;

const addBook = async (req) => {
    const { title, description, year, author, publisher, status } = req.body
    
    const result = await Book.create({ title, description, year, author, publisher, status})
    if(!result) {
        msg: "failed add book"
    }
    return result
}

const getAllBook = async (req) => {
    const result = await Book.findAll()
    if(!result) {
        msg: "failed findAll book"
    }
    return result

}

const getBookById = async (req) => {
    const { id } = req.params
    const result = await Book.findByPk( id )

    if(!result){
        console.log(`Data dengan PK = ${id} tidak ditemukan`)
    }

    return result
}

module.exports = {
    addBook,
    getAllBook,
    getBookById
}