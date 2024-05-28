const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EmpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [25, "Name must not be more than 25 characters"],
  },
  
  email: {
    type: String,
    required: [true, "Please provide a email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  photoUrl: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
  },
  password:{
    type:String,
    
    minLength: 3,
    required:[true,"Please provide a password"],

},
  


});

EmpSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


EmpSchema.methods.createJWT = function () {
  return jwt.sign(
    { empId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_LIFETIME) }
  );
};

EmpSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch 
}
module.exports = mongoose.model("Emp", EmpSchema);
