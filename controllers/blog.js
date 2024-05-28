const { INTERNAL_SERVER_ERROR } = require("http-status-codes")
const Blog = require("../models/blog")



const createBlog = async(req,res)=>{
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json({blog})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const fetchBlogs = async(req,res)=>{
    try {
        const {id}= req.params;
        const blogs = await Blog.find({Author:id})
        if(!blogs){
            res.status(404).json({msg:"Sorry, there are no blogs by this user"})
            return
        }
        res.status(201).json({blogs})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {createBlog, fetchBlogs}