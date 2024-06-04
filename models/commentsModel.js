const mongoose = require("mongoose")
const {Schema} = mongoose

const commentSchema = new mongoose.Schema({

    commentAuthor:{
        type: Schema.Types.ObjectId,
         ref:"Emp"
    },
    commentBody:{
        type:String,
        required:true,
        trim: true,
        maxLength: [250,"250 characters max"]

    },
    AuthorName:{
        type: String,
        ref:"Emp",
        required: true
    },
    AuthorPhotoUrl:{
        type:String,
        ref:"Emp",
    
    },
    blogPostId:{
        type: Schema.Types.ObjectId,
         ref:"blogs"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("comments",commentSchema )