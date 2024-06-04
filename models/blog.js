const mongoose = require("mongoose");
const {Schema} = mongoose;

const blogSchema = new mongoose.Schema({

    BlogTitle : {
        type: String,
        required: true,
        trim: true,
        minLength:[8, "Blog title should have atleast 8 characters"],
        maxLength: [50,"Blog title has to be within 50 characters"]
    },
    Author:{
        type: Schema.Types.ObjectId,
         ref:"Emp"
    },
  
    BlogContent :{
        type: String,
        required: true,
        trim: true,
        maxLength: [250, "250 characters max..."]
    },
    AuthorPhotoUrl:{
        type:String,
        ref:"Emp",
    
    },
    AuthorName:{
        type: String,
        ref:"Emp",
        required: true
    },

},    
{
    timestamps: true
});

module.exports = mongoose.model("blogs", blogSchema)

