const express=require('express')
const upload=require('../fileUpload')
const { register, verifyuser, resendverification, getuser, getuserdetail, updateuser, deleteuser, signin, signout } = require('../Controller/UserController')
const router=express.Router()

router.post('/register',upload.single('image'),register)
router.get('/verification/:id',verifyuser)
router.post('/resendverification',resendverification)
router.get('/getuser',getuser)
router.get('/getuserdetail/:id',getuserdetail)
router.put('/updateuser/:id',updateuser)
router.delete('/deleteuser/:id/:email',deleteuser)
router.post('/login',signin)
router.get('/logout',signout)

module.exports=router
