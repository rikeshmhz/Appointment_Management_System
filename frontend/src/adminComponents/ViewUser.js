import React, { useEffect, useState } from 'react'
import { HiArrowSmallLeft, HiArrowSmallRight } from 'react-icons/hi2'
import { BsSearch } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'
import Sidebar from './Sidebar'
import { deleteuser, getuser } from '../APi/Adminapi'
import Swal from 'sweetalert2'

const ViewUser = () => {
    const [user, setUser] = useState([])
    const [currentPg, setCurrentPg] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search,setSearch]=useState('')
    const [filteruser,setFilteruser]=useState([])
    useEffect(() => {
        setTimeout(() => {
            getuser()
                .then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setUser(data)
                        setFilteruser(data)
                        setLoading(false)
                    }
                })
        }, 500)
    }, [])
    const handleFilter=()=>{
        setFilteruser(user.filter(item=>{
          return search.toLowerCase()==""?
          item : item.email.toLowerCase().includes(search.toLowerCase()) 
        }))
    }
    const userPerPg = 6
    const numOfPg = Math.ceil(filteruser.length / userPerPg)
    let pages = [...Array(numOfPg + 1).keys()].slice(currentPg - 1, currentPg + 8)
    const indexOfLastuser = currentPg * userPerPg
    const indexOfFirstuser = indexOfLastuser - userPerPg
    if (indexOfFirstuser === 0) {
        pages = [...Array(numOfPg + 1).keys()].slice(currentPg, currentPg + 8)
    }
    const visibleuser = filteruser.slice(indexOfFirstuser, indexOfLastuser)
    let sn = indexOfFirstuser + 1
    if (filteruser.length < indexOfLastuser) {
        var newindexOfLastuser = filteruser.length
    } else {
        newindexOfLastuser = indexOfLastuser
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
    const handleDelete = (id,email) => (e) => {
        e.preventDefault()
        Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete It!',
            confirmButtonColor: "#DD6B55",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                deleteuser(id,email)
                    .then(data => {
                        if (data.error) {
                            setError(data.error)
                        }
                    })
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Successfull',
                    allowOutsideClick: false
                }).then(function () {
                    window.location.reload(false)
                })
            }
        })
    }
    const showError = () => {
        if (error) {
            Swal.fire(error)
        }
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
                            <div className="w-40">
                                <Skeleton className="h-8" />
                            </div>
                            :
                            <span className='text-3xl font-bold'>Users Details</span>
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
                                        <input type="search" class="pl-8 p-1 w-80 text-sm text-gray-900 border border-gray-300 rounded-lg" placeholder="Search by Email" onChange={e => setSearch(e.target.value)} onKeyUp={handleFilter} />
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
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            visibleuser.length>0?
                                            visibleuser && visibleuser.map((v) => (
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
                                                        <td className="px-6 py-4">
                                                            <span className="font-medium cursor-pointer text-red-600 hover:underline" onClick={handleDelete(v._id,v.email)}>Delete</span>
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
                                    <span className="text-sm font-normal text-gray-500">Showing <span className="font-semibold text-gray-900">{indexOfFirstuser + 1}-{newindexOfLastuser}</span> of <span className="font-semibold text-gray-900">{filteruser.length}</span></span>
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

export default ViewUser