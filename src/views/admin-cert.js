import React from 'react'

import { Helmet } from 'react-helmet'

import SolidButton from '../components/solid-button'
import PlaceCard from '../components/place-card'
import '../css/admin-cert.css'
import NavBar from '../components/NavBar'

const AdminCert = () => {
    return (
        <div>
            <NavBar name = "Admin View Events Page"/>
            <PlaceCard city="test"></PlaceCard>
        </div>
    )
}

export default AdminCert