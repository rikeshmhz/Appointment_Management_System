import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaMoneyBill, FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Sidebar from './Sidebar'

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    })
    return (
        <>
        <Sidebar dashboard/>
            <div className="p-4 sm:ml-64">
                <div className='my-8'>
                    {
                        loading ?
                            <div className="w-36">
                                <Skeleton className="h-8" />
                            </div>
                            :
                            <span className="text-3xl font-bold">Dashboard</span>
                    }
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4 mt-24">
                    {
                        loading ?
                            <Link to="/viewuser">
                                <div>
                                    <Skeleton className="h-32" />
                                </div>
                            </Link>
                            :
                            <Link to="/viewuser">
                                <div className="flex items-center h-32 rounded bg-pink-100">
                                    <p className="text-lg font-medium p-3">Users</p>
                                    <FaUser className='w-6 h-5' />
                                </div>
                            </Link>
                    }
                    {
                        loading ?
                            <Link to="/balance">
                                <div>
                                    <Skeleton className="h-32" />
                                </div>
                            </Link>
                            :
                            <Link to="/balance">
                                <div className="flex items-center h-32 rounded bg-yellow-100">
                                    <p className="text-lg font-medium p-3">Balance</p>
                                    <FaMoneyBill className='w-6 h-10' />
                                </div>
                            </Link>
                    }
                    {
                        loading ?
                            <Link to="/acceptappointment">
                                <div>
                                    <Skeleton className="h-32" />
                                </div>
                            </Link>
                            :
                            <Link to="/acceptappointment">
                                <div className="flex items-center h-32 rounded bg-green-100">
                                    <p className="text-lg font-medium p-3">Accept</p>
                                    <FaCheck className='w-6 h-10' />
                                </div>
                            </Link>
                    }
                    {
                        loading ?
                            <Link to="/rejectappointment">
                                <div>
                                    <Skeleton className="h-32" />
                                </div>
                            </Link>
                            :
                            <Link to="/rejectappointment">
                                <div className="flex items-center h-32 rounded bg-orange-100">
                                    <p className="text-lg font-medium p-3">Reject</p>
                                    <ImCross className='w-6 h-10' />
                                </div>
                            </Link>
                    }                  
                </div>
            </div>
        </>
    )
}

export default Dashboard