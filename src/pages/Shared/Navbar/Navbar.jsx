import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import Logo from '../../../components/Logo/Logo'
import useAuth from '../../../hooks/useAuth'
import DarkModeToggle from '../../../components/DarkMode'

const Navbar = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut().then(() => navigate('/login'))
    }

    const links = <>
        <NavLink
            to="/"
            className={({ isActive }) =>
                `mr-5 px-2 py-1 rounded ${isActive
                    ? "bg-red-600 text-white dark:bg-red-500"
                    : "text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400"
                }`
            }
        >
            Home
        </NavLink>

        <NavLink
            to="/pending-donation-requests"
            className={({ isActive }) =>
                `mr-5 px-2 py-1 rounded ${isActive
                    ? "bg-red-600 text-white dark:bg-red-500"
                    : "text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400"
                }`
            }
        >
            Blood Donation Requests
        </NavLink>

        <NavLink
            to="/funding"
            className={({ isActive }) =>
                `mr-5 px-2 py-1 rounded ${isActive
                    ? "bg-red-600 text-white dark:bg-red-500"
                    : "text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400"
                }`
            }
        >
            Funding
        </NavLink>

        <NavLink
            to="/articles"
            className={({ isActive }) =>
                `mr-5 px-2 py-1 rounded ${isActive
                    ? "bg-red-600 text-white dark:bg-red-500"
                    : "text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400"
                }`
            }
        >
            Articles
        </NavLink>

        <NavLink
            to="/services"
            className={({ isActive }) =>
                `mr-5 px-2 py-1 rounded ${isActive
                    ? "bg-red-600 text-white dark:bg-red-500"
                    : "text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400"
                }`
            }
        >
            Services
        </NavLink>
    </>;


    return (
        <div className="sticky top-0 z-50 bg-base-200 shadow-md">
            <div className="navbar text-primary font-bold max-w-7xl mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">
                        <Logo />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end ml-4">
                            <img
                                tabIndex={0}
                                role="button"
                                className="w-8 h-8 mr-5 rounded-full cursor-pointer"
                                src={user.photoURL}
                                alt=""
                            />
                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-50">
                                <NavLink className="m-3" to="/dashboard">Dashboard</NavLink>
                                <button onClick={handleLogOut} className="btn bg-red-600 text-white m-3">
                                    Logout
                                </button>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn bg-red-600 text-white">Login</Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
