const Blog = require("../models/blog")



const createBlog = async(req,res)=>{
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json({blog})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

// const fetchBlog = async(req,res)=>{
//     try {
//         const {id}= req.params;
//         const blogs = await Blog.find({Author:id})
//         if(!blogs){
//             res.status(404).json({msg:"Sorry, there are no blogs by this user"})
//             return
//         }
//         res.status(200).json({blogs})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }
const fetchAuthors = async(req,res)=>{
    
    try{
        const authors = await Blog.distinct("AuthorName")
        res.status(200).json({authors})
    }
    catch(error){
        res.status(500).json({msg: error.message})
    }
}

const fetchBlogs = async(req,res)=>{
    const author = req.query.Author || "All";
    const order = req.query.order || "desc";
    const page =  parseInt(req.query.page) || 1;
    const blogsPerPage = parseInt(req.query.limit) || 3;
    const skip = (page-1)*blogsPerPage;
    
   try {
        let blogsCount;
        let blogs;

        if(author === "all" || author === "All"){
            blogsCount = await Blog.countDocuments();
            blogs = await Blog.find({}).skip(skip).sort({createdAt: order}).limit(blogsPerPage);
        }
        else{
            blogsCount = await Blog.countDocuments({AuthorName : author});
            blogs = await Blog.find({AuthorName : author}).skip(skip).sort({createdAt: order}).limit(blogsPerPage);
        }
        if(req.query.page && skip >= blogsCount){
            throw new Error("This page doesn't exist")
        }

        res.status(200).json({
            blogs,
            totalPage: Math.ceil(blogsCount/blogsPerPage),
            currentPage: page
        })
   } catch (error) {
    res.status(500).json({msg: error.message})    
   }
}

// const paginatedResults = (model)=>{
//     return (req,res,next)=>{
      
        
//         res.paginatedResults = results
//         next()
//     }
// }
module.exports = {createBlog, fetchBlogs, fetchAuthors}