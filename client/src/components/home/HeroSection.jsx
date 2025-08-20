import React from 'react'
import Button from '../UiUx.jsx/Button'
import heroImg from '../../assets/hero-img.png'

const HeroSection = () => {
  return (
    <section 
      className="py-5 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg,rgb(249, 247, 249), rgb(222, 238, 223))",
        boxShadow: "0 0 20px rgba(0, 150, 136, 0.25), 0 0 40px rgba(0, 150, 136, 0.15)",
        borderRadius: "1rem"
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Column - Text */}
          <div 
            className="col-md-6 text-center text-md-start mb-4 mb-md-0"
            data-aos="fade-right"
          >
            <h1 className="display-5 fw-bold">
              Using Behavioral Therapy to Help 
              <span style={{
                background: "linear-gradient(90deg, #009688, #4caf50)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                {" "}Kids Thrive
              </span>.
            </h1>
            <p className="lead mt-3">
              We offer child-friendly behavioral therapy in Kenya by ensuring that
              our services are personalized to a child's emotional, social, physical, 
              and academic needs. We use evidence-based approaches and prioritize 
              family-centered techniques to address your kid's needs.
              <br />
              <strong>Book a session with us and be part of a supportive community.</strong>
            </p>
            <Button label="Schedule a free consultation" className="mt-4" />
          </div>

          {/* Right Column - Image */}
          <div 
            className="col-md-6 text-center"
            data-aos="fade-left"
          >
            <img 
              src={heroImg} 
              alt="A behavioral therapy session" 
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
