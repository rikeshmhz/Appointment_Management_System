const formemail=()=>{
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let pattern=/^[a-z]{1}[0-9a-z._]{3,12}[@]{1}[a-z]{4,}[.]{1}[a-z.]{3,}$/
    if(email===""){
        display("emailvalidation","Please Fill","red")
        enable("button","none")
    }else if(!email.match(pattern)){
        display("emailvalidation","Invalid","red")
        enable("button","none")
    }else{
        display("emailvalidation","Done","green")
        if(!password==""){
            enable("button","block")
        }
    }
}
const formfname=()=>{
    let fname=document.getElementById("firstname").value
    let password=document.getElementById("password").value
    let pattern=/^[A-Za-z]{1}[a-z]{2,12}$/
    if(fname===""){
        display("fnamevalidation","Please Fill","red")
        enable("button","none")
    }else if(!fname.match(pattern)){
        display("fnamevalidation","Invalid","red")
        enable("button","none")
    }else{
        display("fnamevalidation","Done","green")
        if(!password==""){
            enable("button","block")
        }
    }
}
const formlname=()=>{
    let lname=document.getElementById("lastname").value
    let password=document.getElementById("password").value
    let pattern=/^[A-Za-z]{1}[a-z]{2,12}$/
    if(lname===""){
        display("lnamevalidation","Please Fill","red")
        enable("button","none")
    }else if(!lname.match(pattern)){
        display("lnamevalidation","Invalid","red")
        enable("button","none")
    }else{
        display("lnamevalidation","Done","green")
        if(!password==""){
            enable("button","block")
        }
    }
}
const formpassword=()=>{
    let email=document.getElementById("email").value
    let fname=document.getElementById("firstname").value
    let lname=document.getElementById("lastname").value
    let password=document.getElementById("password").value
    let pattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*._])[A-Za-z0-9!@#$%^&*._]{8,}$/
    if(password===""){
        display("passwordvalidation","Please Fill","red")
        enable("button","none")
    }
    else if(password.length<8){
        display("passwordvalidation","Minimum 8 Characters","red")
        enable("button","none")
    }
    else if(!password.match(pattern)){
        display("passwordvalidation","Choose a Strong Password","red")
        enable("button","none")
    }
    else{
        display("passwordvalidation","Done","green")
        if((!email=="")&&(!fname=="")&&(!lname=="")&&(!password=="")){
            enable("button","block")
        }
    }
}
const newpassword=()=>{
    let fname=document.getElementById("firstname").value
    let lname=document.getElementById("lastname").value
    let password=document.getElementById("password").value
    console.log(password)
    let pattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*._])[A-Za-z0-9!@#$%^&*._]{8,}$/
    if(password===""){
        display("passwordvalidation","Please Fill","red")
        enable("button","none")
    }
    else if(password.length<8){
        display("passwordvalidation","Minimum 8 Characters","red")
        enable("button","none")
    }
    else if(!password.match(pattern)){
        display("passwordvalidation","Strong Password Require","red")
        enable("button","none")
    }
    else{
        display("passwordvalidation","Done","green")
        if((!fname=="")&&(!lname=="")&&(!password=="")){
            enable("button","block")
        }
    }
}
const display=(id,msg,color)=>{
    document.getElementById(id).innerHTML=msg
    document.getElementById(id).style.color=color
}
const enable=(id,action)=>{
    document.getElementById(id).style.display=action
}
export default{
    formemail,
    formfname,
    formlname,
    formpassword,
    newpassword
}