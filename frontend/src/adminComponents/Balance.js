import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Skeleton from 'react-loading-skeleton'
import { FaMoneyBill } from 'react-icons/fa'
import { getacceptappointment } from '../APi/Adminapi'

const Balance = () => {
    const [productPrice, setProductPrice] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            getacceptappointment()
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        setProductPrice(data)
                        setLoading(false)
                    }
                })
        }, 500)
    })
    const service_price_arr = productPrice.map(v => v.service_price)
    const service_price_total = productPrice.length > 0 ? service_price_arr.reduce((a, b) => {
        return a + b
    }) : 0
    return (
        <>
            <Sidebar dashboard />
            <div className="p-4 sm:ml-64">
                <div className="my-8">
                    {
                        loading ?
                            <div className="w-36">
                                <Skeleton className="h-8" />
                            </div>
                            :
                            <span className="text-3xl font-bold">Balance</span>
                    }
                    <div className="mt-24">
                        {
                            loading ?
                                <div>
                                    <Skeleton className="h-32" />
                                </div>
                                :
                                <div className="flex items-center h-32 rounded bg-yellow-100">
                                    
                                    <p className="text-lg font-medium p-3 m-auto"><FaMoneyBill className='w-6 h-10 m-auto' />Your Total Balance Till Date:<span className="font-bold p-3 text-green-400">Rs. {service_price_total}</span></p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Balance