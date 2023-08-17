import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { getservicedetails, updateservice } from '../APi/Adminapi'
import Swal from 'sweetalert2'

const UpdateService = () => {
    let [text, setText] = useState('')
    const [service, setService] = useState('')
    const [price, setPrice] = useState('')
    let { id } = useParams()
    const navigate =useNavigate()

    useEffect(() => {
        getservicedetails(id)
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `${data.error}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else {
                    setText(data)
                }
            })
    })
    const handleSubmit=(e)=>{
        e.preventDefault()
        updateservice(id,service,price)
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
                    title: 'Update Successfull',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    navigate("/service")
                })
            }
        })
    }

    return (
        <>
            <Sidebar service />
            <div className="p-4 sm:ml-64">
                <div className='my-10'>
                    <span className='text-3xl font-bold'>Update Service</span>
                </div>
                <form>
                    <div className="bg-gray-800 px-80 py-16">
                        <div className="mb-6">
                            <label className="block mb-2 sm:ms-20 lg:ms-36 text-sm font-medium text-gray-50">Service Name</label>
                            <input type="text" id="service" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" onChange={e => { setService(e.target.value) }} defaultValue={text.service_name} />
                        </div>
                        <div className="mb-10">
                            <label className="block mb-2 sm:ms-20 lg:ms-40 text-sm font-medium text-gray-50">Price</label>
                            <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  sm:w-52 lg:w-96 block p-2.5" onChange={e => { setPrice(e.target.value) }} defaultValue={text.service_price} />
                        </div>
                        <button type="submit" className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm sm:w-52 lg:w-96 px-5 py-2.5 text-center" onClick={handleSubmit}>Update</button>
                       
                        
                    </div>
                    
                </form>
                
            </div>
            
        </>
    )
}

export default UpdateService