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
const fetchTags = async(req,res)=>{
    try {
        const tags = await Blog.distinct("Tag")
        res.status(200).json({tags})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
const fetchBlogs = async(req,res)=>{
    // const author = req.query.Author || "All";
    // const order = req.query.order || "desc";
    // const tag = req.query.Tag || "All";
    // const page =  parseInt(req.query.page) || 1;
    // const blogsPerPage = parseInt(req.query.limit) || 3;
    // const skip = (page-1)*blogsPerPage;
//    try {
//         let blogsCount;
//         let blogs;

//         if((author === "all" || author === "All")&&(tag === "all" || tag === "All")){
//             blogsCount = await Blog.countDocuments();
//             blogs = await Blog.find({}).skip(skip).sort({createdAt: order}).limit(blogsPerPage);
//         }
//         else if(author === "all" || author === "All"){
//             blogsCount = await Blog.countDocuments({ Tag: tag});
//             console.log(blogsCount);
//             blogs = await Blog.find({Tag: tag}).skip(skip).sort({createdAt: order}).limit(blogsPerPage);
//         }
//         else if((tag === "all" || tag === "All")){
//             blogsCount = await Blog.countDocuments({AuthorName : author});
//             console.log(blogsCount);
//             blogs = await Blog.find({AuthorName : author}).skip(skip).sort({createdAt: order}).limit(blogsPerPage);
//         }
//         else{
//             blogsCount = await Blog.countDocuments({AuthorName : author, Tag: tag});
//             console.log(blogsCount);
//             console.log("else case says hi")
//             blogs = await Blog.find({AuthorName : author , Tag: tag}).skip(skip).sort({createdAt: order}).limit(blogsPerPage);
//         }
//         if(req.query.page && skip >= blogsCount){
//             throw new Error("This page doesn't exist")
//         }

//         res.status(200).json({
//             blogs,
//             totalPage: Math.ceil(blogsCount/blogsPerPage),
//             currentPage: page
//         })
//    } catch (error) {
//     res.status(500).json({msg: error.message})    
//    }
// }

try {
    const { Author = "All", order = "desc", Tag = "All", page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;
    
    let filter = {};
    if (Author !== "All" && Author !== "all") {
        filter.AuthorName = Author;
    }
    if (Tag !== "All" && Tag !== "all") {
        filter.Tag = Tag;
    }

    const blogsCount = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
                            .skip(skip)
                            .sort({ createdAt: order })
                            .limit(parseInt(limit));

    if (page > 1 && skip >= blogsCount) {
        throw new Error("This page doesn't exist");
    }

    res.status(200).json({
        blogs,
        totalPage: Math.ceil(blogsCount / limit),
        currentPage: parseInt(page)
    });
} catch (error) {
    res.status(500).json({ msg: error.message });
}
};

// const paginatedResults = (model)=>{
//     return (req,res,next)=>{
      
        
//         res.paginatedResults = results
//         next()
//     }
// }
module.exports = {createBlog, fetchBlogs, fetchAuthors, fetchTags}