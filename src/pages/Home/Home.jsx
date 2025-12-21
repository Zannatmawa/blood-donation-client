import React from 'react'
import Banner from './Banner/Banner'
import ContactSection from './ContactUs/ContactUs'
import FAQ from './FaqSection/FaqSection'
import FeaturedArticles from './Articles/Articles'
import useTitle from '../../components/UseTitle'

const Home = () => {
    useTitle("Home");
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