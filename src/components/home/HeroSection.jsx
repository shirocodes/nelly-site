import React from 'react'
import Button from '../UiUx.jsx/Button'
import heroImg from '../../assets/hero-img.png'

const HeroSection = () => {
  return (
    <section className='bg-light py-3'>
      <div className='container'>
        <div className='row align-items-center'>
        <h2 className='display-5'>Using Behavioral Therapy to Help Kids Thrive.</h2>
          <div className='col-md-6 order-1 order-md-2 text-center mt-2 mt-md-0'>
              <img 
                src={heroImg}
                alt='A behavioral therapy session'
                className='img-fluid rounded shadow'
              />
            </div>
          <div className='col-md-6 order-2 order-md-1 text-md-start'>
            <p className='lead mt-3'>
              We offer child-friendly behavioral therapy in Kenya by ensuring that
              our services are personalized to a child's emotional, social, physical, 
              and academic needs. We use evidence-based approaches and prioritize family-centered
              techniques to address your kid's needs.
              Book a session with us and be part of a supportive community.
            </p>
            <Button label='Schedule a free consultation' className="mt-4" />
          </div>
          
        </div>
      </div>
    </section>
      
   
  )
}

export default HeroSection 