const Service=require('../model/ServiceModel')

exports.addservice=async(req,res)=>{
    const {service_name,service_price}=req.body
    if((service_name==='')||(service_price==='')){
        return res.status(400).json({error:"Please fill all required fields"})
    }
    let service=await Service.findOne({service_name:service_name})
    if(!service){
        let serviceadd=new Service({
            service_name:service_name,
            service_price:service_price
        })
        serviceadd=await serviceadd.save()
        if(!serviceadd){
            return res.status(400).json({error:"Could not add Service"})
        }
        return res.send(serviceadd)
    }
    return res.status(400).json({error:"Service exists.."})
}
exports.getdetails=async(req,res)=>{
    let asc={service_name:1}
    let service=await Service.find().sort(asc)
    if(!service){
        return res.status(400).json({error:"Something went wrong"})
    }
    return res.send(service)
}
exports.getservicedetails=async(req,res)=>{
    let service=await Service.findById(req.params.id)
    if(!service){
        return res.status(400).json({error:"Something went wrong"})
    }
    return res.send(service)
}
exports.updateservice=async(req,res)=>{
    const {service_name,service_price}=req.body
    if(service_name===''){
        return res.status(400).json({error:"Please Update Name"})
    }
    if(service_price===''){
        return res.status(400).json({error:"Please Update Price"})
    }
    let service=await Service.findByIdAndUpdate(req.params.id,{
        service_name:service_name,
        service_price:service_price
    })
    if(!service){
        return res.status(400).json({error:"Something went wrong"})
    }
    return res.send(service)
}
exports.deleteservice=async(req,res)=>{
    let service=await Service.findByIdAndDelete(req.params.id)
    if(!service){
        return res.status(400).json({error:"Something went Wrong"})
    }
    return res.status(200).json({success:"Delete Successfully"})
}