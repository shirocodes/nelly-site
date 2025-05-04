import React from 'react'
import { InlineWidget } from 'react-calendly'

const Booking = () => {
  return (
    <section className='container my-4'>
      <h2>Schedule a Free consultation</h2>
      <p className='text-center mb-4'>
        Select a suitable time to interact with a certified behavior analyst.
      </p>

    {/* Calendly inline widget features */}
      <div className='calendly-inline-widget d-flex justify-content-center'>
        <InlineWidget
          url='https://calendly.com/ishirapt/new-meeting' 
          styles={{height: '100%'}}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '0069ff',
            textColor: '4d5055'
          }}
        />
      </div>
    </section>
  )
}

export default Booking 