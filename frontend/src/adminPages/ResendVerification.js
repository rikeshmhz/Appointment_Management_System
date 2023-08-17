import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { resendverification } from '../APi/Userapi'
import Swal from 'sweetalert2'
 
const ResendVerification = () => {
    const location=useLocation()
    const email=location.state.email

    const handleClick=(e)=>{
        e.preventDefault()
        resendverification(email)
        .then(data=>{
            if(data.error){
                Swal.fire({
                    icon: 'error',
                    text: `${data.error}`,
                })
            }
            else{
                Swal.fire({
                    icon: 'success',
                    text: `${data.message}`,
                })
            }
        })
    }
  return (
    <>
        <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow dark:border mt-36 md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight ms-28 md:text-2xl text-white md:ms-28">
                                Please Verify
                            </h1>
                                <div>
                                    <label className="block mb-2 text-sm font-normal text-white">A Token was sent to <span className="font-bold">{email}</span> Please verify from Email</label>                                 
                                </div>
                                <p className="text-sm font-light text-white">
                                    Didn't receive Token <Link to="#" onClick={handleClick} className="font-medium hover:underline">click here </Link>
                                    to sent again
                                </p>
                           
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default ResendVerification