const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const tokenSchema=({
    token:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300 //5 min
    }
})
module.exports=mongoose.model("Token",tokenSchema)