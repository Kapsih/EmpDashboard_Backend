
const Emp = require("../models/emp")
const {StatusCodes} = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require("../errors")


const register = async(req,res)=>{
    try {
        const emp = await Emp.create({...req.body})
        
        const token = emp.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name: emp.name, id: emp._id}, token})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide an email and password")
    }
    const emp = await Emp.findOne({email})
    if(!emp){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const isPassword = await emp.comparePassword(password)
    if(isPassword){
        const token = emp.createJWT()
        res.status(StatusCodes.OK).json({user:{name:emp.name, id: emp._id}, token})
    }
    if(!isPassword){
        throw new UnauthenticatedError("Invalid Credentials")
    }
}



module.exports = {login,register}