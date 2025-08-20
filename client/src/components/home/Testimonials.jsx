import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'

const testimonials = [
  {
    name: "Grace, Parent in Nairobi",
    feedback: "The therapy sessions have been life-changing for our child. We saw improvements in both social and academic confidence within weeks."
  },
  {
    name: "Michael, Father of 7-year-old",
    feedback: "We felt truly supported as a family. The therapist not only worked with our child but guided us as parents too."
  },
  {
    name: "Aisha, Guardian",
    feedback: "The personalized care and attention exceeded our expectations. My niece looks forward to every session."
  },
  {
    name: "David, Teacher",
    feedback: "I've seen positive changes in my student’s focus and participation in class since starting therapy."
  },
  {
    name: "Fatma, Aunt",
    feedback: "The team explained everything clearly and gave us tools to support our child at home as well."
  },
  {
    name: "James, Parent",
    feedback: "We feel hopeful again. The support has been consistent, professional, and very encouraging."
  }
]

const Testimonials = () => {
  return (
    <section 
      className="py-5"
      style={{ background: "linear-gradient(180deg, #f9f9fb, #eef7f1)" }}
    >
      <div className="container text-center">
        <h2 className="fw-bold mb-4">What Families Say</h2>
        <p className="text-muted mb-5">
          We’re honored to walk this journey with parents and caregivers across Kenya.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 }, // tablets
            992: { slidesPerView: 3, spaceBetween: 30 }  // desktops
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div 
                className="p-4 rounded shadow-sm h-100"
                style={{
                  background: "white",
                  borderLeft: "5px solid #009688",
                  fontStyle: "italic"
                }}
              >
                <p>"{t.feedback}"</p>
                <h6 className="fw-bold mt-3 text-success">{t.name}</h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
