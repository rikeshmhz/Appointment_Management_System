import { API } from '../config'

export const getservice = () => {
    return fetch(`${API}/service/getdetails`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const getservicedetails = (id) => {
    return fetch(`${API}/service/getservicedetails/${id}`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const addservice = (service_name, service_price) => {
    let service = { service_name, service_price }
    return fetch(`${API}/service/addservice`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(service)
    })
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const deleteservice = (id) => {
    return fetch(`${API}/service/deleteservice/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const updateservice = (id, service_name, service_price) => {
    let services = { service_name, service_price }
    return fetch(`${API}/service/updateservice/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(services)
    })
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}

export const getuserdetail = (id) => {
    return fetch(`${API}/user/getuserdetail/${id}`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const updateuser = (id, email, confirmPassword, firstname, lastname, newPassword) => {
    let user = { email, confirmPassword, firstname, lastname, newPassword }
    return fetch(`${API}/user/updateuser/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const getuser = () => {
    return fetch(`${API}/user/getuser`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const deleteuser = (id, email) => {
    return fetch(`${API}/user/deleteuser/${id}/${email}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}

export const getappointment = () => {
    return fetch(`${API}/appointment/getappointment`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const getacceptappointment = () => {
    return fetch(`${API}/appointment/getacceptappointment`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const getrejectappointment = () => {
    return fetch(`${API}/appointment/getrejectappointment`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}
export const updatestatus = (id, email, service, status) => {
    let appointment = { email, service,status }
    return fetch(`${API}/appointment/updatestatus/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(appointment)
    })
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}