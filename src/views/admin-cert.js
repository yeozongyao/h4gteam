import React from 'react'
import EventDiv from '../components/eventDiv'
import NavBar from '../components/NavBar'
import '../css/admin-cert.css'

const AdminCert = () => {
    return (
        <div className='adminCert-main-div'>
            <NavBar name = "Admin View Events Page"/>
            <div className='admin-list-of-events'>
            <EventDiv city="Admin Cert 1" description="blank" ></EventDiv>
            <EventDiv city="Admin Cert 2" description="blanker"></EventDiv>
            </div>
        </div>
    )
}

export default AdminCert