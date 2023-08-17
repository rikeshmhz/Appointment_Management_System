import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { addservice } from '../APi/Adminapi'
import Swal from 'sweetalert2'

const AddService = () => {
    const [service, setService] = useState('')
    const [price, setPrice] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()  
        addservice(service, price)
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
                        title: 'Service Added',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
            })
    }
    return (
        <>
            <Sidebar service />
            <div className="p-4 sm:ml-64">
                <div className='my-10'>
                    <span className='text-3xl font-bold'>Add New Service</span>
                </div>
                <form>
                    <div className="bg-gray-800 px-80 py-16">
                        <div className="mb-6">
                            <label className="block mb-2 sm:ms-20 lg:ms-36 text-sm font-medium text-gray-50">Service Name</label>
                            <input type="text" id="service" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" placeholder="Enter Service Name"  onChange={e => { setService(e.target.value) }} />
                        </div>
                        <div className="mb-10">
                            <label className="block mb-2 sm:ms-20 lg:ms-40 text-sm font-medium text-gray-50">Price</label>
                            <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" placeholder="Enter Price"  onChange={e => { setPrice(e.target.value) }} />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-52 lg:w-96 px-5 py-2.5 text-center" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddService