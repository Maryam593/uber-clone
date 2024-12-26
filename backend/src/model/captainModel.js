import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const captainSchema = new mongoose.Schema({
 FullName : {
    firstName : {type:String,
        require : true, 
        minLength : [3, 'first name atleast carries three alphabets']
    },
    lastName :  {type: String,
        minLength : [3, 'last name atleast carries three alphabets']
    }
 },
 email : {
    type : String, 
    require : true, 
    unique : true,
 },
 password :{
    type:String,
    require:true,
    select: false
 },
 socketId : {
    type: String
 },
 status: {
    type : String,
    enum : ['active', 'inactive'],
    default  : 'inactive'
 },
vehicle : {
   color : {
      type : String, 
      require : true, 
      minLength : [3, 'atleast contain 3 alphabets']
   },
   plate : {
      type : String,
      require : true , 
      minLength : [3, 'atleast contain 3 alphabets']
   },
   capacity : {
      type : Number, 
      require : true, 
      minLength : [1, 'capacity must be of atleast 1']
   },
   vehicle_Type : {
      type : String,
      require : true, 
      enum : ['car', 'motorcycle', 'rickshaw']
   },
},
location : {
   lattitude : {
      type : Number, 
     
   },
   longitude : {
      type : Number, 
    
   }
}
})
captainSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {expiresIn : '24h'});
   return token;
 };
captainSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
 };
 captainSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10);
 };
const CaptainModel = mongoose.model("Captain", captainSchema)

export default CaptainModel