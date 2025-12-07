import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/Shared/Navbar/Navbar'
import Footer from '../pages/Shared/Footer/Footer'

const RootLayouts = () => {
    return (
        <div>
            <Navbar />
            <Outlet></Outlet>
            <Footer />
        </div>
    )
}

export default RootLayouts