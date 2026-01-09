import React from 'react'
import Banner from './Banner/Banner'
import ContactSection from './ContactUs/ContactUs'
import FAQ from './FaqSection/FaqSection'
import FeaturedArticles from './Articles/Articles'
import useTitle from '../../components/UseTitle'
import Partners from './Partners/Partners'
// import StatsSection from './StatsSection/StatsSection'
import HowItWorks from './HowItWorks/HowItWorks'
import Testimonials from './Testomonials/Testomonials'
import Services from './Service/Service'

const Home = () => {
    useTitle("Home");
    return (
        <div>
            <Banner />
            <FeaturedArticles />
            <Partners />
            <Services />
            {/* <StatsSection /> */}
            <HowItWorks />
            <Testimonials />
            <ContactSection />
            <FAQ />
        </div>
    )
}

export default Home

//  <div className="dropdown">
//                 <div tabIndex={0} role="button" className="btn btn-ghost ">
//                     <p>Filter by </p>
//                 </div>
//                 <ul
//                     tabIndex="-1"
//                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//                     <li><a>Item 1</a></li>

//                     <li><a>Item 3</a></li>
//                 </ul>
//             </div>