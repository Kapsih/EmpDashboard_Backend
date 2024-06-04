const Comments = require("../models/commentsModel")


const createComments = async(req,res)=>{
    try {
        const comment = await Comments.create(req.body)
        res.status(201).json({comment})

    } catch (error) {
        res.status(500).json({msg:error})
    }
}


const fetchComments = async(req,res)=>{
    try {
        const {id}= req.params;
        const comments = await Comments.find({blogPostId: id})
        if(!comments){
            res.status(404).json({msg:"No comments yet"})
            return
        }
        res.status(200).json({comments})

    } catch (error) {
        res.status(500).json({msg:error})
    }
}

 module.exports = {createComments, fetchComments} 