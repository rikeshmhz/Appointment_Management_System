const mongoose = require("mongoose")
const AppointmentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    service_name:{
        type:String,
        required:true   
    },
    service_price:{
        type:Number,
        required:true
    },
    status: {
        type: Number,
        default: 0
        // 0 is pending, 1 is accept, 2 is reject
    }
}, { timestamps: true })
module.exports = mongoose.model("Appointment", AppointmentSchema)