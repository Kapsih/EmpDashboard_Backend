const Emp = require("../models/emp")

const fetchEmployeesData = async(req,res)=>{
    const emps = await Emp.find({})
    res.status(201).json({emps})
}

const createEmployee = async(req,res)=>{
    try {
        const emp = await Emp.create(req.body)
        res.status(201).json({emp})      
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const fetchEmployeeData = async(req,res)=>{
    try {
        const {id} = req.params; 
        const emp = await Emp.findOne({_id: id})
        if(!emp){
            return res.status(404).json({msg:`Sorry no user found with the id: ${id} `})
        }
        res.status(201).json({emp})
        
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateEmployee = async(req,res)=>{
    try {
        const {id: empId} = req.params;
        const emp = await Emp.findByIdAndUpdate({_id: empId}, req.body, {
            new: true,
            runValidators: true
        })
        if(!emp){
            return res.status(404).json({msg:`No employee with the id: ${empId} `})
        }
        res.status(200).json({emp})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteEmployee = async(req,res)=>{
    try {
        const {id: empId}  = req.params;
        const emp = await Emp.findByIdAndDelete({_id: empId})
        if(!emp){
           return res.status(404).json({msg:`No employee with the Id: ${empId}`})
        }
        res.status(200).json({ emp });
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports = {fetchEmployeesData, fetchEmployeeData, createEmployee, updateEmployee, deleteEmployee,  }