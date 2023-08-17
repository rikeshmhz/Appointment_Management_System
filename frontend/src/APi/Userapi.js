import {API} from '../config'

export const registers=(register)=>{
    return fetch(`${API}/user/register`,{
        method:"POST",
        body:register
    })
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}
export const resendverification=(email)=>{
    let user={email}
    return fetch(`${API}/user/resendverification`,{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(user)
    })
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}
export const emailverification=(token)=>{
    console.log(token+"1+")
    return fetch(`${API}/user/verification/${token}`,{
        method:"GET",
        headers:{
            "Content-Type":"Application/json"
        }
    })
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}
export const Signin=(email,password)=>{
    let user ={email,password}
    return fetch(`${API}/user/login`,{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(user)
    })
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}

export const authenticate=(data)=>{
    localStorage.setItem('jwt',JSON.stringify(data))
}

export const isAuthenticate=()=>{
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}
export const signout=()=>{
    localStorage.removeItem("jwt")
    return fetch(`${API}/user/logout`,{
        method:"GET",
        headers:{
            "Content-Type":"Application/json"
        }
    })
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}