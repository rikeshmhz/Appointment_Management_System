const express=require("express")
const app=express()
require('dotenv').config()
const cors=require('cors')
const serviceroute=require('./routes/ServiceRoute')
const userroute=require('./routes/UserRoute')
const apppointmentrouter = require("./routes/AdminAppointmentRoute")

require('./database/connection')
port=process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Server started at ${port}`)
})

app.use(express.json())
app.use(cors())
app.use('/service',serviceroute)
app.use('/user',userroute)
app.use('/appointment', apppointmentrouter)
app.use('/public/uploads',express.static('public/uploads'))