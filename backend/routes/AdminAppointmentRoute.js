const express = require("express")
const { CreateApp, getappointment, updatestatus, getacceptappointment, getrejectappointment } = require("../Controller/AdminAppointmentController")

const router = express.Router()
router.post('/addappointment', CreateApp)
router.get('/getappointment',getappointment)
router.get('/getacceptappointment',getacceptappointment)
router.get('/getrejectappointment',getrejectappointment)
router.put('/updatestatus/:id',updatestatus)

module.exports = router