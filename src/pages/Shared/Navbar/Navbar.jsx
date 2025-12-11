import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import Logo from '../../../components/Logo/Logo'
import useAuth from '../../../hooks/useAuth'
//mawa@gmail.com
const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user)
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res);
                navigate('/login')
            })
            .catch(error => {
                console.log(error)
            })
    }
    const links = <>
        <NavLink className="mr-5" to="/">Home</NavLink>
        <NavLink className="mr-5" to="/donation-requests">Donate Your Blood</NavLink>
        <NavLink className="mr-5" to="/funding">Funding</NavLink>
    </>
    return (
        <div className="navbar text-primary font-bold  bg-base-200 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <Logo />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">

                {user ? <>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <img tabIndex={0} role="button" className='w-8 h-8  mr-5 rounded-full' src={user.photoURL} alt="" />
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <NavLink className="m-5" to="/dashboard">Dashboard</NavLink>
                            <Link onClick={handleLogOut} className="btn bg-red-600 text-white">Logout</Link>                        </ul>
                    </div>
                    <Link to="/beADonor" className="btn bg-red-600 text-white">Be A donor</Link>

                </>
                    : <Link to="/login" className="btn bg-red-600 text-white">Login</Link>

                }
            </div>
        </div>
    )
}

export default Navbar