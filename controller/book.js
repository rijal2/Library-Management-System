const { addBook, getAllBook, getBookById } = require('../service/books')

const create = async (req, res, next) => {
    try {
        const result = await addBook(req)
        
        res.status(200).json({
            msg: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const index = async (req,res,next) =>{
    try {
        const result = await getAllBook(req)
        res.status(200).json({
            msg: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getBookById(req)

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
    index,
    find
}