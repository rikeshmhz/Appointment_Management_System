import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiPieChartFill } from 'react-icons/ri'
import { MdMiscellaneousServices } from 'react-icons/md'
import { BiTask, BiLogOut } from 'react-icons/bi'
import { isAuthenticate, signout } from '../APi/Userapi'
import {API} from '../config'

const Sidebar = ({ service, dashboard, appointments, profile}) => {
    let navigate=useNavigate()
    if(isAuthenticate().user.role===1){
        var {user}=isAuthenticate()
    }
    const handleSubmit=()=>{
        signout()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                navigate("/login")
            }
        })
    }
    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-64 transition-transform -translate-x-full sm:translate-x-0">
                <div className="h-full px-3 py-4 bg-gray-800">
                    <Link to="/" className="flex items-center mb-5">
                        <span className="self-center text-lg font-semibold text-white">Appointment Management System</span>
                    </Link>
                    <ul className="space-y-5 font-medium">
                        <li>
                            {
                                dashboard ?
                                    <Link to="/dashboard" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 bg-gray-700">
                                        <RiPieChartFill className="w-6 h-6" />
                                        <span className="ml-3">Dashboard</span>
                                    </Link>
                                    :
                                    <Link to="/dashboard" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                                        <RiPieChartFill className="w-6 h-6" />
                                        <span className="ml-3">Dashboard</span>
                                    </Link>
                            }

                        </li>
                        <li>
                            {
                                service ?
                                    <Link to="/service" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 bg-gray-700">
                                        <MdMiscellaneousServices className="w-6 h-6" />
                                        <span className="ml-3">Services</span>
                                    </Link> :
                                    <Link to="/service" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                                        <MdMiscellaneousServices className="w-6 h-6" />
                                        <span className="ml-3">Services</span>
                                    </Link>
                            }
                        </li>
                        <li>
                            {
                                appointments ?
                                    <Link to="/appointments" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 bg-gray-700">
                                        <BiTask className="w-6 h-6 " />
                                        <span className="ml-3">Appointments</span>
                                    </Link>
                                    :
                                    <Link to="/appointments" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                                        <BiTask className="w-6 h-6 " />
                                        <span className="ml-3">Appointments</span>
                                    </Link>
                            }
                        </li>
                        <li>
                            {
                                profile ?
                                    <Link to="/profile" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 bg-gray-700">
                                        <img src={`${API}/${user.image}`} alt="" className="w-6 h-6 rounded-full" />
                                        <span className="ml-3">{user.first_name}</span>
                                    </Link>
                                    :
                                    <Link to="/profile" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                                        <img src={`${API}/${user.image}`} alt="" className="w-6 h-6 rounded-full" />
                                        <span className="ml-3">{user.first_name}</span>
                                    </Link>
                            }
                        </li>
                        <li>
                            <Link to="/login" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700" onClick={handleSubmit}>
                                <BiLogOut className="w-6 h-6 " />
                                <span className="ml-3">LogOut</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            
        </>
    )
}

export default Sidebar