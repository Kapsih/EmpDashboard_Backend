const Emp = require("../models/emp")
const jwt = require("jsonwebtoken")
const {UnauthenticatedError} = require("../errors")

const auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError("Invalid credentials")
    }

    const token = authHeader.split(" ")[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {empId: payload.empId, name: payload.name }
        next()

    } catch (error) {
        console.log("2nd")
        throw new UnauthenticatedError("Invalid Credentials")
    }
}

module.exports = auth