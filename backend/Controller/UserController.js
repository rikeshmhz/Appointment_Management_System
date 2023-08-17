const User = require('../model/UserModel')
const Token = require('../model/TokenModel')
const sendEmail = require('../sendEmail')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    if ((email === undefined) || (first_name === '') || (last_name === '') || (password === undefined)) {
        return res.status(400).json({ error: "Please fill all required fields" })
    }
    const user = await User.findOne({ email: email })
    if (user) {
        return res.status(400).json({ error: "User already exist" })
    }
    let register = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        image: req.file.path
    })
    register = await register.save()
    if (!register) {
        return res.status(400).json({ error: "Something went Wrong" })
    }
    let token = await Token({
        token: crypto.randomBytes(16).toString('hex'),
        user: register._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something went Wrong" })
    }
    const url = `http://localhost:3000/user/verification/${token.token}`
    sendEmail({
        from: "noreplay@gmail.com",
        to: email,
        subject: "Verification Mail",
        text: "Click the following link" + url,
        html: `<a href=${url}>
        <button style=" padding: 10px 40px;
        font-size: 18px;
        background-color: #008542;
        color: #fff;
        text-shadow: 0 2px 0 rgb(0 0 0 / 25%);
        user-select: none;
        cursor: pointer;
        border:0;
        letter-spacing: 1px;
        white-space: unset;
        padding: .8rem 1.5rem;
        font-weight: 900;
        border-radius: 15px">Click to Verify!!</button>
        </a>`
    })
    return res.send(register)
}
exports.verifyuser = async (req, res) => {
    console.log({ token: req.params.id })
    let token = await Token.findOne({ token: req.params.id })
    if (!token) {
        return res.status(400).json({ error: "Invalid Token or Token may have Expire" })
    }
    let verify = await User.findById(token.user)
    if (!verify) {
        return res.status(400).json({ error: "User Associated with Token not Found" })
    }
    if (verify.isVerified) {
        return res.stauts(400).json({ error: "User has already been verified" })
    }
    verify.isVerified = true
    verify = await verify.save()
    if (!verify) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.send({ message: "User verified successfully" })
}
exports.resendverification = async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }
    if (user.isVerified) {
        return res.status(400).json({ error: "User has been already verified" })
    }
    let token = new Token({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something went Wrong" })
    }
    const url = `http://localhost:3000/user/verification/${token.token}`
    sendEmail({
        from: "noreplay@gmail.com",
        to: req.body.email,
        subject: "Verification Mail",
        text: "Click the following link" + url,
        html: `<a href=${url}>
        <button style=" padding: 10px 40px;
        font-size: 18px;
        background-color: #008542;
        color: #fff;
        text-shadow: 0 2px 0 rgb(0 0 0 / 25%);
        user-select: none;
        cursor: pointer;
        border:0;
        letter-spacing: 1px;
        white-space: unset;
        padding: .8rem 1.5rem;
        font-weight: 900;
        border-radius: 15px">Click to Verify!!</button>
        </a>`
    })
    return res.json({ message: "Token Send" })
}
exports.getuser = async (req, res) => {
    let user = await User.find({ role: 0 })
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.send(user)
}
exports.getuserdetail = async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {
        return res.status(400).json({ error: "User not Found" })
    }
    return res.send(user)
}
exports.updateuser = async (req, res) => {
    const { email,confirmPassword,firstname,lastname,newPassword } = req.body
    if ((firstname === '') || (lastname === '') || (newPassword === '')) {
        return res.status(400).json({ error: "Please fill all required fields" })
    }
    let user = await User.findOne({ email: email })
    if (user.authenticate(confirmPassword)) {
        let userupdate = await User.findByIdAndUpdate(req.params.id, {
            first_name: firstname,
            last_name: lastname,
            password: newPassword
        })
        if (!userupdate) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        return res.status(200).json({ message: "User Updated" })
    }
    return res.status(400).json({ error: "Enter correct Password" })
}
exports.deleteuser = async (req, res) => {
    let email = req.params.email
    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    sendEmail({
        from: "noreplay@gmail.com",
        to: email,
        subject: "Account Delete Mail",
        text: "Your Account Has Been Deleted!!",
        html: "<p>Your Account Has Been Deleted!!</p>"
    })
    return res.json({ message: "User Deleted" })
}
exports.signin = async (req, res) => {
    const { email, password } = req.body
    if ((email === '') || (password === '')) {
        return res.status(400).json({ error: "Please fill all required fields" })
    }
    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ error: "Email not found.." })
    }
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "Password not matched.." })
    }
    if (!user.isVerified) {
        return res.status(400).json({ error: "User is not verified please verify before singing in.." })
    }
    //to generate token
    let token = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_SECRET)
    //to store in cookie
    res.cookie('cookies', token)

    const { _id, first_name, last_name, role, image } = user
    res.send({
        token, user: {
            _id, first_name, last_name, email, role, image
        }
    })
}
exports.signout = async (req, res) => {
    res.clearCookie('cookies')
    return res.send({ message: "Signed Out Successfully" })
}