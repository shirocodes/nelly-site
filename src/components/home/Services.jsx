import React from 'react'
import ServiceCard from '../UiUx.jsx/ServicesCard'
import classImg from '../../assets/class-img.jpg'
import homeImg from '../../assets/home-basedImg.jpg'
import playImg from '../../assets/play-img.jpg'
import familyImg from '../../assets/home-img.jpg'

const therapyServices = [
  {
    title: 'Play Therapy',
    description: 'Using social interventions to empower children to play and express themselves.',
    image: {classImg},
    detailsInfo: 'play-therapy'
  },
  {
    title: 'Family-centered intervention',
    description: 'Using social interventions to empower children to play and express themselves.',
    image: {familyImg},
    detailsInfo: 'play-therapy'
  },
  {
    title: 'Speech Therapy',
    description: 'Using social interventions to empower children to play and express themselves.',
    image: {playImg},
    detailsInfo: 'play-therapy'
  },
  {
    title: 'Play Therapy',
    description: 'Using social interventions to empower children to play and express themselves.',
    image:{homeImg},
    detailsInfo: 'play-therapy'
  }
]

const Services = () => {
  return (
    <section className='container my-5'>
      <h2 className='text-center mb-4'>Our Behavior Therapy Services</h2>
      <div className='row g-4'>
        {therapyServices.map((service, index) => (
          <div key={index} className='col-md-4'>
            <ServiceCard {...service}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services 