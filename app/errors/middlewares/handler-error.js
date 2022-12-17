
const { StatusCodes } = require('http-status-codes')
const errorHaldlerMiddlewares = (err, req, res, next) => {
    console.log(err)
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err || 'Something went wrong try again later',
    }
    
    // Error dari Database
    if( err.name === 'SequelizeDatabaseError' ){
        // customError = err.errors.map((item) => item.message);
        customError.msg = err.original.routine
        customError.statusCode = 400
        
    }
    
    if( err.name === 'SequelizeEagerLoadingError' ){
        // customError = err.errors.map((item) => item.message);
        customError.msg = err.message
        customError.statusCode = 400
        
    }
    
    if( err.name === 'SequelizeUniqueConstraintError' ){
        // customError = err.errors.map((item) => item.message);
        console.log(err, 'err')
        customError.msg = `${err.message}`
        customError.value = `${err.errors[0].value}`
        customError.statusCode = 401
        
    }

    // Error validation dari Sequelize
    if( err.name === 'SequelizeValidationError' ){
        // customError = err.errors.map((item) => item.message);
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
        
        customError.statusCode = 400
        
    }
    
    // if( err.code && err.code === 11000 ){
    //     customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    //     customError.statusCode = 400
    // }
    
    // if( err.name === 'CastError' ){
    //     customError.msg = `Hi, No item found with id: ${err.value}`;
    //     customError.statusCode = 404
    // }
    
    return res.status(customError.statusCode).json({msg: customError.msg, value: customError.value })

}

module.exports = errorHaldlerMiddlewares;