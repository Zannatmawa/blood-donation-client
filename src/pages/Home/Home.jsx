import React from 'react'
import Banner from './Banner/Banner'
import ContactSection from './ContactUs/ContactUs'
import FAQ from './FaqSection/FaqSection'
import FeaturedArticles from './Articles/Articles'

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedArticles />
            <ContactSection />
            <FAQ />
        </div>
    )
}

export default Home