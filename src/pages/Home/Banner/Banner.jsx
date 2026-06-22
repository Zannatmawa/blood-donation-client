import React from "react";
import { Link } from "react-router";
import { FaArrowDown } from "react-icons/fa";
import CountUp from "react-countup";

const Banner = () => {
    const stats = [
        { end: 1200, label: "Active Donors", duration: 2.5 },
        { end: 500, label: "Donations", duration: 2.5 },
        { end: 24, label: "24/7 Service", duration: 2 },
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-neutral-50 via-white to-red-50/30 selection:bg-red-500 selection:text-white">

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-12 relative z-10">

                {/* Left Side Content Column */}
                <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">

                    {/* Trust Badge with Micro-Border */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Connecting Donors Across Bangladesh
                    </div>

                    {/* Industrial High-Contrast Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-neutral-900">
                        <span className="text-red-600 block">Donate Blood.</span>
                        <span className="block mt-1">Save Lives.</span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-neutral-600 text-base md:text-lg max-w-xl leading-relaxed font-normal">
                        Welcome to <span className="font-semibold text-neutral-900">Blood Bridge</span> — an advanced pipeline connecting verified blood donors with critical medical requests in real time.
                    </p>

                    {/* Clean Inline Trust Verification */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        <span className="flex items-center gap-1.5"><span className="text-red-500 font-bold">✓</span> Verified Pipelines</span>
                        <span className="flex items-center gap-1.5"><span className="text-red-500 font-bold">✓</span> Priority Matching</span>
                        <span className="flex items-center gap-1.5"><span className="text-red-500 font-bold">✓</span> Secured Logistics</span>
                    </div>

                    {/* Call to Actions */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            to="/register"
                            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-red-600/20 hover:shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
                        >
                            Become a Donor
                        </Link>

                        <Link
                            to="/search"
                            className="px-8 py-4 border border-neutral-200 bg-white/80 hover:bg-neutral-50 backdrop-blur-md text-neutral-800 rounded-xl font-bold tracking-wide shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
                        >
                            Find Blood Now
                        </Link>
                    </div>

                    {/* Grid Stats Container */}
                    <div className="mt-14 grid grid-cols-3 gap-4 w-full max-w-lg border-t border-neutral-100 pt-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-left">
                                <h3 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight flex items-baseline">
                                    <CountUp end={stat.end} duration={stat.duration} />
                                    {stat.end > 100 && <span className="text-red-500 ml-0.5 text-xl font-bold">+</span>}
                                </h3>
                                <p className="mt-1 text-[11px] font-bold text-neutral-400 uppercase tracking-widest leading-tight">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right Side Visual Column (Premium Framed Mask) */}
                <div className="flex-1 w-full flex justify-center lg:justify-end relative">

                    {/* Floating Emergency Badge Indicator */}
                    <div className="absolute top-6 left-4 md:left-12 z-20 bg-white/90 backdrop-blur-md border border-neutral-200/60 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-float max-w-xs">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                        <div className="text-left">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Live Status</p>
                            <p className="text-xs font-bold text-neutral-800">14 Active Emergency Requests</p>
                        </div>
                    </div>

                    {/* Geometric Layered Graphic Display */}
                    <div className="relative group max-w-sm sm:max-w-md lg:max-w-none">

                        {/* Soft Outer Drop Shadows Container */}
                        <div className="absolute -inset-2 bg-linear-to-r from-red-500 to-rose-600 rounded-[4xl opacity-10 blur-xl group-hover:opacity-15 transition-opacity duration-300"></div>

                        <div className="relative border border-neutral-200/50 p-3 bg-white/50 backdrop-blur-sm rounded-4xl shadow-2xl">
                            <img
                                src="https://images.pexels.com/photos/12820063/pexels-photo-12820063.jpeg"
                                alt="Blood Donation"
                                className="w-full h-[400px] lg:w-[460px] lg:h-[520px] rounded-[22px] object-cover filter brightness-[0.98] contrast-[1.02]"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-neutral-400 gap-1.5 pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Discover More
                </span>
                <FaArrowDown className="text-xs text-red-500 animate-bounce" />
            </div>
        </section>
    );
};

export default Banner;