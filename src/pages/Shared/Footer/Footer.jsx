import React from 'react'
import { NavLink } from 'react-router'
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";


const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-[#D32F2F] text-white p-10">
            <nav>
                <div className='flex flex-col justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.5 21a10.4 10.4 0 0113 0M21 12l-1.5 1.5M3 12l1.5 1.5" />
                    </svg>
                    <div className='text-white '>
                        <span>Blood</span>
                        <span>Bridge</span>
                    </div>
                </div>

            </nav>
            <nav>
                <NavLink className="mr-5" to="/">Home</NavLink>
                <NavLink className="mr-5" to="/pending-donation-requests">BLood Donation Requests</NavLink>
                <NavLink className="mr-5" to="/funding">Funding</NavLink>

            </nav>
            <nav>
                <a className="link link-hover text-2xl"><CiYoutube /></a>
                <a className="link link-hover text-2xl"><FaXTwitter /></a>
                <a className="link link-hover text-2xl">                <CiFacebook /></a>
            </nav>
            <form>
                <h6 className="footer-title">Newsletter</h6>
                <fieldset className="w-80">
                    <label>Enter your email address</label>
                    <div className="join">
                        <input
                            type="text"
                            placeholder="username@site.com"
                            className="input input-bordered join-item" />
                        <button className="btn btn-primary join-item">Subscribe</button>
                    </div>
                </fieldset>
            </form>
        </footer>
    )
}

export default Footer