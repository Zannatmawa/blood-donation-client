import React from 'react'
import Banner from './Banner/Banner'
import ContactSection from './ContactUs/ContactUs'
import FAQ from './FaqSection/FaqSection'
import FeaturedArticles from './Articles/Articles'
import useTitle from '../../components/UseTitle'
import Partners from './Partners/Partners'
import StatsSection from './StatsSection/StatsSection'
import HowItWorks from './HowItWorks/HowItWorks'
import Testimonials from './Testomonials/Testomonials'
import Services from './Service/Service'
import Categories from './Categories/Categories'

const Home = () => {
    useTitle("Home");
    return (
        <div>
            <Banner />
            <FeaturedArticles />
            <Categories />
            <Services />
            <HowItWorks />
            <StatsSection />
            <Partners />
            <Testimonials />
            <ContactSection />
            <FAQ />
        </div>
    )
}

export default Home

