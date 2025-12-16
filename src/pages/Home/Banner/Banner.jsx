import React from 'react'
import { Link } from 'react-router'

const Banner = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-10">

                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-red-600 leading-tight">
                        Donate Blood, <span className="text-black">Save Lives</span>
                    </h1>

                    <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-xl">
                        Welcome to <span className="font-semibold text-red-600">Blood Bridge</span> —
                        connecting life-saving donors with patients in need. Every drop counts.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
                        <Link to="/register" className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition">Join as a donor</Link>
                        <Link to="/search" className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition">Search Donors</Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-3 gap-4 max-w-xs mx-auto md:mx-0">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-red-600">1,200+</h3>
                            <p className="text-gray-600 text-sm">Active Donors</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-red-600">500+</h3>
                            <p className="text-gray-600 text-sm">Donations</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-red-600">24/7</h3>
                            <p className="text-gray-600 text-sm">Service</p>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-center">
                    <img
                        // src="https://cdni.iconscout.com/illustration/premium/thumb/donate-blood-5698357-4755211.png"
                        src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                        alt="Blood Donation Illustration"
                        className="w-72 md:w-96 drop-shadow-xl"
                    />
                </div>
            </div>
        </section>


    )
}

export default Banner