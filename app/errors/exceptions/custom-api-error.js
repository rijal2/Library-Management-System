class CustomAPIError extends Error{
    constructor(message){
        super(message)
        this.msg = message
    }
    
}

module.exports = CustomAPIError