import React from 'react'
import EventDiv from '../components/eventDiv'
import NavBar from '../components/NavBar'
import '../css/admin-events.css'

const AdminEvents = () => {
    return (
        <div className='adminCert-main-div'>
            <NavBar name = "Admin View Events Page"/>
            <div className='admin-list-of-events'>
            <EventDiv city="Admin Events 1" description="Input Description Here"></EventDiv>
            <EventDiv city="Admin Events 2" description="Input Description Here"></EventDiv>
            </div>
        </div>
    )
}

export default AdminEvents