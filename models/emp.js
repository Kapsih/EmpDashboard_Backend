const mongoose = require("mongoose")

const EmpSchema = new mongoose.Schema({
    name: {type: String,
    required:[true, "Must provide a name"],
    trim: true,
    maxlength: [25,"Name must not be more than 25 characters"]
    },
    empId: {type: Number,
    require:[true, "Must provide EmpID"],
    },
    email:{
        type: String,
        require:[true, "Must provide EmpID"],
    },
    photoUrl: {
        type:String
    }
})

module.exports = mongoose.model("Emp",EmpSchema)