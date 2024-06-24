require("dotenv").config()
require('express-async-errors');
const express = require("express")
const app = express();
const port = 5000;
const connectDB = require("./db/connect")

const cors = require("cors")
const empDataRouter = require("./routes/empDataRoutes")
const authRouter = require("./routes/authRoutes")
const blogRouter = require("./routes/blogRoutes")
const commentRouter = require("./routes/commentRoutes")

const errorHandlerMiddleware = require("./middleware/error-handler")
const authenticateEmp = require("./middleware/authentication");


// middlewares
app.use(express.json())
app.use(cors({
    origin:"*"
}))
// routes
app.use("/emp-data",authenticateEmp,empDataRouter)
app.use("/auth", authRouter)
app.use("/blogs", authenticateEmp,blogRouter)
app.use("/comments",authenticateEmp, commentRouter)
app.use(errorHandlerMiddleware)


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