import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ServiceCard from '../UiUx.jsx/ServicesCard'
import classImg from '../../assets/class-img.jpg'
import homeImg from '../../assets/home-basedImg.jpg'
import playImg from '../../assets/play-img.jpg'
import familyImg from '../../assets/home-img.jpg'

const therapyServices = [
  {
    title: 'Play Therapy',
    description: 'Using social interventions to empower children to play and express themselves.',
    image: classImg,
    detailsInfo: 'play-therapy'
  },
  {
    title: 'Family-centered intervention',
    description: 'Using social interventions to empower children to play and express themselves.',
    image: familyImg,
    detailsInfo: 'play-therapy'
  },
  {
    title: 'Speech Therapy',
    description: 'Using social interventions to empower children to play and express themselves.',
    image: playImg,
    detailsInfo: 'play-therapy'
  },
  {
    title: 'Play Therapy',
    description: 'Using social interventions to empower children to play and express themselves.',
    image:homeImg,
    detailsInfo: 'play-therapy'
  }
]

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }) // fade-in duration
  }, [])
  return (
    <section className='container my-5' 
      style={{background: "linear-gradient(145deg,rgb(249, 247, 249), rgb(222, 238, 223))",
          boxShadow: "0 0 20px rgba(0, 150, 136, 0.4), 0 0 40px rgba(0, 150, 136, 0.2)",
   }}
    >
      <h2 className='text-center mb-4'>Our Behavior Therapy Services</h2>
      <div className='row g-4'>
        {therapyServices.map((service, index) => (
          <div 
            key={index} 
            className='col-12 col-md-6 col-lg-6'
            data-aos="fade-up"       //\ Add animation
            data-aos-delay={index * 100} // stagger effect
          >
            <ServiceCard {...service}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services 