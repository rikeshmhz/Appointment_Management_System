import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { registers } from '../APi/Userapi'
import Swal from 'sweetalert2'
import all_data from '../Script/Validation'

const Register = () => {
    const [selectedImage, setSelectedImage] = useState('')
    let navigate=useNavigate()
    let [register,setRegister]=useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image: '',
        formdata:new FormData()
    })
    let file_ref=useRef()
    let {first_name,last_name,email,password,formdata}=register
    const imageChange = (e) => {
        if (e) {
            setSelectedImage(e[0])
        }
    }
    const handleChange=(name)=>(e)=>{
        let value
        if(name==='image'){
            value=e.target.files[0]
        }
        else{
            value=e.target.value
        }
        setRegister({...register,[name]:value})
        formdata.set(name,value)
        console.log(formdata)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        registers(formdata)
        .then(data=>{
            if(data.error){
                setRegister({...register})
                Swal.fire({
                    icon: 'error',
                    title: 'Unable to Create Account',
                    text: `${data.error}`,
                })
            }else{
                setRegister({first_name:'',last_name:'',email:'',password:'',formdata:new FormData()})
                file_ref.current.value=''
                setSelectedImage('')
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created',
                    text: 'Please Verify from your Email',
                }).then(function (){
                    navigate("/resendverification",{state:{email:data.email}})
                })
            }
        })
    }
    return (
        <>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight ms-28 md:text-2xl md:ms-20 text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="" >
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-white">Your Email<span id="emailvalidation" className="ms-5"></span></label>
                                    <input type="email" name="email" id="email" className="border sm:text-sm rounded-lg block w-full p-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 text-gray-900" placeholder="Eg. name@gmail.com" value={email} onChange={handleChange('email')} onKeyUp={all_data.formemail}/>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">First Name<span id="fnamevalidation" className="ms-5"></span></label>
                                        <input type="text" name="firstname" id="firstname" className="border sm:text-sm rounded-lg block w-full p-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 text-gray-900" placeholder="Eg. Firstname" value={first_name} onChange={handleChange('first_name')} onKeyUp={all_data.formfname}/>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">Last Name<span id="lnamevalidation" className="ms-5"></span></label>
                                        <input type="text" name="lastname" id="lastname" className="border sm:text-sm rounded-lg block w-full p-2.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 text-gray-900" placeholder="Eg. Lastname" value={last_name} onChange={handleChange('last_name')} onKeyUp={all_data.formlname}/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-white">Password<span id="passwordvalidation" className="ms-5"></span></label>
                                    <input type="password" name="password" id="password" className="border sm:text-sm rounded-lg block w-full p-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 text-gray-900" placeholder="Enter Password" value={password} onChange={handleChange('password')} onKeyUp={all_data.formpassword}/>
                                </div>
                                <div className="flex ">
                                    <input type="file" name="image" id="image" className="hidden" onChange={handleChange('image')} onInput={e=>{imageChange(e.target.files)}} ref={file_ref}/>   

                                    {/* onChange{
                                        (e)=>{
                                            handleChange('image')
                                            imageChange(e.target.files)
                                        }
                                    }   */}

                                    <label for="image" className="rounded-lg text-gray-900 w-full bg-gray-300 hover:bg-gray-400 p-4 h-20 cursor-pointer inline-flex justify-between"><p className="inline-flex p-3 text-gray-900"><MdOutlineAddPhotoAlternate className="w-6 h-6 mx-4" /> Choose a Photo</p>
                                        {selectedImage && (
                                            <figure>
                                                <img src={URL.createObjectURL(selectedImage)} alt="" className="h-14 w-14 rounded-full" />
                                            </figure>
                                        )}
                                    </label>
                                </div>
                                <button className="w-full text-white bg-indigo-600 hover:bg-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center hidden" id="button" onClick={handleSubmit}>Create an account</button>
                                <p className="text-sm font-light text-white">
                                    Already have an account? <Link to="/login" className="font-medium text-white hover:underline">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register