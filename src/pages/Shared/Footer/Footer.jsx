import React from 'react'
import { NavLink } from 'react-router'
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import Logo from '../../../components/Logo/Logo';


const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-[#D32F2F] text-white p-10">
            <nav>
                <Logo />

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