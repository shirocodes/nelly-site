import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'
import TeamSection from '../components/home/TeamSection'

const Home = () => {
  return (
    <>
        <HeroSection />
        <Services />
        <Testimonials />
        <TeamSection />
    </>
  )
}

export default Home