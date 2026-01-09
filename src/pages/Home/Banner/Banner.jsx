import React from "react";
import { Link } from "react-router";
import { FaArrowDown } from "react-icons/fa";
import CountUp from "react-countup";


const Banner = () => {
    return (
        <section className="bg-white min-h-[60vh] md:min-h-[70vh] flex items-center relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-12">

                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-red-600 leading-tight">
                        Donate Blood,{" "}
                        <span className="text-black">Save Lives</span>
                    </h1>

                    <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-xl">
                        Welcome to{" "}
                        <span className="font-semibold text-red-600">Blood Bridge</span> —
                        connecting life-saving donors with patients in need. Every drop counts.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
                        <Link
                            to="/register"
                            className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md
              hover:bg-red-700 hover:scale-105 transition transform"
                        >
                            Join as a Donor
                        </Link>

                        <Link
                            to="/search"
                            className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold
              hover:bg-red-600 hover:text-white hover:scale-105 transition transform"
                        >
                            Search Donors
                        </Link>
                    </div>

                    {/* Stats */}

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-3 gap-4 max-w-xs mx-auto md:mx-0">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-red-600">
                                <CountUp end={1200} duration={2.5} />+
                            </h3>
                            <p className="text-gray-600 text-sm">Active Donors</p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-red-600">
                                <CountUp end={500} duration={2.5} />+
                            </h3>
                            <p className="text-gray-600 text-sm">Donations</p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-red-600">
                                <CountUp end={24} duration={2} />
                            </h3>
                            <p className="text-gray-600 text-sm">Service (Hours)</p>
                        </div>
                    </div>

                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="https://images.pexels.com/photos/12820063/pexels-photo-12820063.jpeg"
                        alt="Blood Donation"
                        className="w-72 md:w-96 drop-shadow-xl animate-float"
                    />
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-red-600 animate-bounce">
                <span className="text-sm mb-1">Scroll</span>
                <FaArrowDown />
            </div>
        </section>
    );
};

export default Banner;
