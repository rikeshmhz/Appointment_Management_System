import React, { useEffect, useState } from 'react'
import { HiArrowSmallLeft, HiArrowSmallRight } from 'react-icons/hi2'
import { BsSearch } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'
import Sidebar from './Sidebar'
import { getrejectappointment, updatestatus } from '../APi/Adminapi'
import Swal from 'sweetalert2'

const RejectAppointment = () => {
    const [appointment, setAppointment] = useState([])
    const [currentPg, setCurrentPg] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search,setSearch]=useState('')
    const [filterappointment,setFilterappointment]=useState([])
    useEffect(() => {
        setTimeout(() => {
            getrejectappointment()
                .then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setAppointment(data)
                        setFilterappointment(data)
                        setLoading(false)
                    }
                })
        }, 500)
    }, [])
    const handleFilter=()=>{
        setFilterappointment(appointment.filter(item=>{
          return search.toLowerCase()==""?
          item : item.service_name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) 
        }))
    }
    const appointmentPerPg = 6
    const numOfPg = Math.ceil(filterappointment.length / appointmentPerPg)
    const pages = [...Array(numOfPg + 1).keys()].slice(currentPg, currentPg + 8)
    const indexOfLastappointment = currentPg * appointmentPerPg
    const indexOfFirstappointment = indexOfLastappointment - appointmentPerPg
    const visibleappointment = filterappointment.slice(indexOfFirstappointment, indexOfLastappointment)
    let sn = indexOfFirstappointment + 1
    if (filterappointment.length < indexOfLastappointment) {
        var newindexOfLastappointment = filterappointment.length
    } else {
        newindexOfLastappointment = indexOfLastappointment
    }
    const prevPgHandler = () => {
        if (currentPg !== 1) {
            setCurrentPg(currentPg - 1)
        }
    }
    const nextPgHandler = () => {
        if (currentPg !== numOfPg) {
            setCurrentPg(currentPg + 1)
        }
    }
    const showError = () => {
        if (error) {
            Swal.fire(error)
        }
    }
    const handleStatus = (id, email, service, status) => (e) => {
        e.preventDefault()
        updatestatus(id, email, service, status)
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `${data.error}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Appointment Accepted',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function () {
                        window.location.reload(false)
                    })
                }
            })
    }
    return (
        <>
            {
                showError()
            }
            <Sidebar dashboard />
            <div className="p-4 sm:ml-64">
                <div className='my-8'>
                    {
                        loading ?
                            <div className="w-64">
                                <Skeleton className="h-8" />
                            </div>
                            :
                            <span className='text-3xl font-bold'>Reject Appointments</span>
                    }

                </div>
                <div className="relative  sm:rounded-lg">
                    <div className="flex justify-between">
                        {
                            loading ?
                                <>
                                    <span className="w-24"><Skeleton /></span>
                                    <span className="w-80"><Skeleton className="h-8" /></span>
                                </>
                                :
                                <>
                                    <span className="text-sm font-normal text-gray-500">Current Page: <span className="font-semibold text-gray-900 ">{currentPg}</span></span>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <BsSearch className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <input type="search" class="pl-8 p-1 w-80 text-sm text-gray-900 border border-gray-300 rounded-lg" placeholder="Search by Service Name, Email" onChange={e => setSearch(e.target.value)} onKeyUp={handleFilter} />
                                    </div>
                                </>
                        }
                    </div>
                    {
                        loading ?
                            <>
                                <Skeleton className="mt-4 h-80" />
                            </>
                            :
                            <>
                                <table className="w-full text-sm text-left text-gray-500 mt-4">
                                    <thead className="text-xs text-gray-400 uppercase bg-gray-700 font-semibold">
                                        <tr>
                                            <th className="px-6 py-3">
                                                S.No.
                                            </th>
                                            <th className="px-6 py-3">
                                                First Name
                                            </th>
                                            <th className="px-6 py-3">
                                                Last Name
                                            </th>
                                            <th className="px-6 py-3">
                                                Email
                                            </th>
                                            <th className="px-6 py-3">
                                                Date
                                            </th>
                                            <th className="px-6 py-3">
                                                Time
                                            </th>
                                            <th className="px-6 py-3">
                                                Phone
                                            </th>
                                            <th className="px-6 py-3">
                                                Service Name
                                            </th>
                                            <th className="px-6 py-3">
                                                Service Price
                                            </th>
                                            <th className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            visibleappointment.length>0?
                                            visibleappointment.map((v) => (
                                                <>
                                                    <tr className="border-b bg-gray-800 border-gray-700">
                                                        <th className="px-6 py-4 font-normal text-white">
                                                            {sn}
                                                        </th>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.first_name}
                                                        </td>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.last_name}
                                                        </td>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.email}
                                                        </td>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.date}
                                                        </td>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.time}
                                                        </td>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.phone}
                                                        </td>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.service_name}
                                                        </td>
                                                        <td className="px-6 py-4 font-normal text-white">
                                                            {v.service_price}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="font-medium cursor-pointer text-green-600 hover:underline me-3" onClick={handleStatus(v._id, v.email, v.service_name, 1)}>Accept</span>
                                                        </td>
                                                    </tr>
                                                    <tr className="hidden">
                                                        {
                                                            sn = sn + 1
                                                        }
                                                    </tr>
                                                </>
                                            )):
                                            <div className="text-red-500">No Data Found!!</div>
                                        }

                                    </tbody>
                                </table>
                            </>
                    }

                    <nav className="flex items-center justify-between pt-4">
                        {
                            loading ?
                                <>
                                    <span className="w-32"><Skeleton /></span>
                                </>
                                :
                                <>
                                    <span className="text-sm font-normal text-gray-500">Showing <span className="font-semibold text-gray-900">{indexOfFirstappointment + 1}-{newindexOfLastappointment}</span> of <span className="font-semibold text-gray-900">{filterappointment.length}</span></span>
                                </>
                        }
                        {
                            loading ?
                                <>
                                    <span className="w-96"><Skeleton className="h-10" /></span>
                                </>
                                :
                                <>
                                    <ul className="inline-flex items-center">
                                        <li onClick={prevPgHandler} className="cursor-pointer">
                                            <p className="block px-3 py-2.5 ml-0 text-gray-500 border rounded-l-lg bg-gray-800 dark:border-gray-700 hover:bg-gray-700 hover:text-white">
                                                <HiArrowSmallLeft />
                                            </p>
                                        </li>
                                        {
                                            pages.map((v) => (
                                                <>
                                                    <li onClick={() => setCurrentPg(v)} className="cursor-pointer w-12">
                                                        <p className="px-3 py-1.5 ml-0 text-gray-500 border bg-gray-800 dark:border-gray-700 hover:bg-gray-700 hover:text-white ">{v}</p>
                                                    </li>
                                                </>
                                            ))
                                        }

                                        <li onClick={nextPgHandler} className="cursor-pointer">
                                            <p className="block px-3 py-2.5 ml-0 text-gray-500 border rounded-r-lg bg-gray-800 dark:border-gray-700 hover:bg-gray-700 hover:text-white">
                                                <HiArrowSmallRight />
                                            </p>
                                        </li>
                                    </ul>
                                </>
                        }
                    </nav>
                </div>
            </div>

        </>
    )
}

export default RejectAppointment