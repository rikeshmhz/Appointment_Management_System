import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './adminComponents/Sidebar'
import Dashboard from './adminComponents/Dashboard'
import Home from './adminPages/Home'
import Service from './adminComponents/Service'
import ServicePage from './adminPages/ServicePage'
import AddService from './adminComponents/AddService'
import AddServicePage from './adminPages/AddServicePage'
import Appointments from './adminComponents/Appointments'
import AppointmentsPage from './adminPages/AppointmentsPage'
import ProfilePage from './adminPages/ProfilePage'
import UpdateProfilePage from './adminPages/UpdateProfilePage'
import Register from './adminPages/Register'
import Login from './userComponents/Login'
import UpdateServicePage from './adminPages/UpdateServicePage'
import ResendVerification from './adminPages/ResendVerification'
import EmailVerification from './adminPages/EmailVerification'
import ViewUserPage from './adminPages/ViewUserPage'
import AcceptAppointmentsPage from './adminPages/AcceptAppointmentPage'
import RejectAppointmentPage from './adminPages/RejectAppointmentPage'
import BalancePage from './adminPages/BalancePage'

const MyRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/side' element={<Sidebar/>}/>
                <Route path='/dash' element={<Dashboard/>}/>
                <Route path='/dashboard' element={<Home/>}/>  
                <Route path='/ser' element={<Service/>}/>  
                <Route path='/viewuser' element={<ViewUserPage/>} />
                <Route path='/balance' element={<BalancePage/>} />
                <Route path='/acceptappointment' element={<AcceptAppointmentsPage/>} />
                <Route path='/rejectappointment' element={<RejectAppointmentPage/>} />
                <Route path='/service' element={<ServicePage/>}/>  
                <Route path='/add' element={<AddService/>}/>  
                <Route path='/addservice' element={<AddServicePage/>}/>
                <Route path='/app' element={<Appointments/>}/>  
                <Route path='/appointments' element={<AppointmentsPage/>}/>  
                <Route path='/profile' element={<ProfilePage/>}/>  
                <Route path='/updateprofile' element={<UpdateProfilePage/>}/>  
                <Route path='/register' element={<Register/>}/>       
                <Route path='/login' element={<Login/>}></Route> 
                <Route path='/updateservice/:id' element={<UpdateServicePage/>}></Route>  
                <Route path='/resendverification' element={<ResendVerification/>}></Route>   
                <Route path='/user/verification/:token' element={<EmailVerification/>}></Route>          

            </Routes>
        </BrowserRouter>
    </>
  )
}

export default MyRoutes