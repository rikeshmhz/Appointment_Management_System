import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { isAuthenticate } from '../APi/Userapi'
import { getuserdetail } from '../APi/Adminapi'
import Swal from 'sweetalert2'

const Profile = () => {
    const [loading, setLoading] = useState(true)
    let [text,setText]=useState('')
    let id=isAuthenticate().user._id
    useEffect(() => {
        setTimeout(() => {
            getuserdetail(id)
            .then(data=>{
                if(data.error){
                    Swal.fire(data.error)
                }else{
                    setText(data)
                    setLoading(false)
                }
            })
        }, 500)
    })
    return (
        <>
        <Sidebar profile/>
            <div className="p-4 sm:ml-64">
                <div className='my-10'>
                    {
                        loading ?
                            <div className="w-24">
                                <Skeleton className="h-8" />
                            </div>
                            :
                            <span className='text-3xl font-bold'>Profile</span>
                    }
                </div>
                {
                    loading ?
                        <>
                            <Skeleton className="mt-4 h-[500px]" />
                        </>
                        :
                        <>
                            <form>
                                <div className="bg-gray-800 px-80 py-16">
                                    <div className="mb-6">
                                        <label className="block mb-2 sm:ms-20 lg:ms-40 text-sm font-medium text-gray-50">Email</label>
                                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" value={text.email} readOnly />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 sm:ms-16 lg:ms-36 text-sm font-medium text-gray-50">First Name</label>
                                        <input type="text" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" value={text.first_name} readOnly />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 sm:ms-16 lg:ms-36 text-sm font-medium text-gray-50">Last Name</label>
                                        <input type="text" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" value={text.last_name} readOnly />
                                    </div>
                                    <div className="mb-10">
                                        <label className="block mb-2 sm:ms-20 lg:ms-36 text-sm font-medium text-gray-50">Password</label>
                                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" value="*****" readOnly />
                                    </div>
                                    <Link to="/updateprofile"><button type="submit" className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm sm:w-52 lg:w-96 px-5 py-2.5 text-center">Update</button></Link>
                                </div>
                            </form>
                        </>
                }
            </div>
        </>
    )
}

export default Profile