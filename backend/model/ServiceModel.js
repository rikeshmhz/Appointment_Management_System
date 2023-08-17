const mongoose=require('mongoose')

const ServiceSchema=new mongoose.Schema({
    service_name:{
        type:String,
        required:true   
    },
    service_price:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Service",ServiceSchema)