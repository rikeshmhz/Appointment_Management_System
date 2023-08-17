const express=require('express')
const { addservice, getdetails, updateservice, deleteservice, getservicedetails } = require('../Controller/ServiceController')
const router=express.Router()

router.post('/addservice',addservice)
router.get('/getdetails',getdetails)
router.put('/updateservice/:id',updateservice)
router.delete('/deleteservice/:id',deleteservice)
router.get('/getservicedetails/:id',getservicedetails)

module.exports=router