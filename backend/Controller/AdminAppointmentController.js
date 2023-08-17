const Appointment = require("../model/AdminAppointmentModel")
const sendEmail = require('../sendEmail')

//to add appointment:
exports.CreateApp = async (req, res) => {
    const { email, first_name, last_name, phone, date, time, service_name, service_price } = req.body
    let app = new Appointment({
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        date: date,
        time: time,
        service_name: service_name,
        service_price: service_price
    })
    app = await app.save()
    if (!app) {
        return res.status(400).json({ error: "Appointment cannot be added.." })
    }
    return res.json({ success: "Appointment Added Successfully.." })
}

exports.getappointment = async (req, res) => {
    let appointment = await Appointment.find({ status: 0 })
    if (!appointment) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.send(appointment)
}
exports.getacceptappointment = async (req, res) => {
    let appointment = await Appointment.find({ status: 1 })
    if (!appointment) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.send(appointment)
}
exports.getrejectappointment = async (req, res) => {
    let appointment = await Appointment.find({ status: 2 })
    if (!appointment) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.send(appointment)
}
exports.updatestatus = async (req, res) => {
    const { email, service, status } = req.body
    let appointment = await Appointment.findByIdAndUpdate(req.params.id, {
        status: status
    })
    if (!appointment) {
        return res.status(400).json({ error: "Something went wrong" })
    } 
    if (status == 1) {
        sendEmail({
            from: "noreplay@gmail.com",
            to: email,
            subject: "Appointment Accept Mail",
            text: `Your Appointment for ${service} Has Been Accepted!!`,
            html: `<p>Your Appointment for ${service} Has Been Accepted!!</p>`
        })
    }
    if(status==2){
        sendEmail({
        from: "noreplay@gmail.com",
        to: email,
        subject: "Appointment Reject Mail",
        text: `Your Appointment for ${service} Has Been Rejected!!`,
        html: `<p>Your Appointment for ${service} Has Been Rejected!!</p>`
    })
    }
    return res.send(appointment)
}