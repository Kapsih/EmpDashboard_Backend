const {CustomApiError} = require('../errors')
const {StatusCodes} = require("http-status-codes")

const errorHandlerMiddleware = (err,req,res,next)=>{

    if(err instanceof CustomApiError){
     
         return res.status(err.statusCode).json({msg: err.message})

    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
}

module.exports = errorHandlerMiddleware