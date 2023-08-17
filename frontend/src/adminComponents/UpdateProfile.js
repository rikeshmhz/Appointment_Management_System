import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { isAuthenticate } from '../APi/Userapi'
import { getuserdetail, updateuser } from '../APi/Adminapi'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import all_data from '../Script/Validation'

const UpdateProfile = () => {
    let navigate=useNavigate()
    let [text, setText] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [newPassword, setNewPassword] = useState('')
    let id = isAuthenticate().user._id
    const email = text.email
    useEffect(() => {
        getuserdetail(id)
            .then(data => {
                if (data.error) {
                    Swal.fire(data.error)
                } else {
                    setText(data)
                }
            })
    })
    const handleSubmit=(e)=>{
        e.preventDefault()
        updateuser(id,email,confirmPassword,firstname,lastname,newPassword)
        .then(data=>{
            if(data.error){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `${data.error}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(function () {
                    navigate("/profile")
                })
            }
        })
    }
    return (
        <>
            <Sidebar profile />
            <div className="p-4 sm:ml-64">
                <div className='my-10'>
                    <span className='text-3xl font-bold'>Update Profile</span>
                </div>
                <form>
                    <div className="bg-gray-800 px-80 py-16">
                        <div className="mb-6">
                            <label className="block mb-2 sm:ms-20 lg:ms-36 text-sm font-medium text-gray-50">Confirm Password</label>
                            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" placeholder="Enter Confirm Password" onChange={e => { setConfirmPassword(e.target.value) }} />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 sm:ms-16 lg:ms-36 text-sm font-medium text-gray-50">First Name<span id="fnamevalidation" className="ms-5"></span></label>
                            <input type="text" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" defaultValue={text.first_name} onChange={e => { setFirstname(e.target.value) }} onKeyUp={all_data.formfname}/>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 sm:ms-16 lg:ms-36 text-sm font-medium text-gray-50">Last Name<span id="lnamevalidation" className="ms-5"></span></label>
                            <input type="text" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" defaultValue={text.last_name} onChange={e => { setLastname(e.target.value) }} onKeyUp={all_data.formlname}/>
                        </div>
                        <div className="mb-10">
                            <label className="block mb-2 sm:ms-20 lg:ms-36 text-sm font-medium text-gray-50">New Password<span id="passwordvalidation" className="ms-5"></span></label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" placeholder="Enter New Password" onChange={e => { setNewPassword(e.target.value) }} onKeyUp={all_data.newpassword}/>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-52 lg:w-96 px-5 py-2.5 text-center hidden" id="button"onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateProfile