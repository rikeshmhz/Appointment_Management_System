import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { emailverification } from '../APi/Userapi'
import Swal from 'sweetalert2'

const EmailVerification = () => {
    let navigate=useNavigate()
    let params=useParams()
    let token=params.token 
    useEffect(()=>{
        console.log(token)
      emailverification(token)
      .then(data=>{
        if(data.error){
            Swal.fire({
                icon: 'error',
                text: `${data.error}`,
            }).then(function (){
                navigate('/login')
            })
        }else{
            Swal.fire({
                icon: 'success',
                text: `${data.message}`,
            }).then(function (){
                navigate('/login')
            })
        }
      })
    },)
  return (
    <>
    </>
  )
}

export default EmailVerification