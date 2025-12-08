import React from 'react'
import { Outlet } from 'react-router'
import Logo from '../components/Logo/Logo'

const AuthLayouts = () => {
    return (
        <div>
            {/* <Logo /> */}
            <Outlet />
        </div>
    )
}

export default AuthLayouts