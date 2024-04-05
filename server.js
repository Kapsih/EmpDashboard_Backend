require("dotenv").config()
const employees = require("./data")
const Emp = require("./models/emp")
const express = require("express")
const app = express();
const port = 5000;
const connectDB = require("./db/connect")
const cors = require("cors")

// middlewares
app.use(express.json())
app.use(cors({
    orgin:"*"
}))

// routes

app.get("/emp-data", async(req,res)=>{
    const emps = await Emp.find({})
    res.status(201).json({emps})
})

app.get("/emp-data/:id", async(req,res)=>{
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
    
})

app.post("/emp-data",async(req,res)=>{
    try {
        const emp = await Emp.create(req.body)
        res.status(201).json({emp})      
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

app.delete("/emp-data/:id",async(req,res)=>{
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
})

app.patch("/emp-data/:id", async(req,res)=>{
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

})




const startDB = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server listening on port: ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
startDB()