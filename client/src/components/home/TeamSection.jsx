import React from 'react'

const team = [
  {
    name: "Jane Mwangi",
    role: "Lead Behavioral Analyst",
    bio: "Specializes in child-focused therapy with over 8 years of experience guiding families through personalized behavioral strategies."
  },
  {
    name: "David Otieno",
    role: "Autism Field Officer",
    bio: "Works closely with schools and communities to ensure inclusive support systems for children on the autism spectrum."
  },
  {
    name: "Sarah Kamau",
    role: "Family Support Specialist",
    bio: "Helps parents integrate therapy strategies into everyday family routines, ensuring consistency at home."
  }
]

const TeamSection = () => {
  return (
    <section className="py-5" style={{ background: "linear-gradient(180deg, #eef7f1, #f9f9fb)" }}>
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Meet Our Team</h2>
        <p className="text-muted mb-5">
          Our dedicated professionals are passionate about helping children thrive
          through evidence-based behavioral therapy.
        </p>

        <div className="row g-4">
          {team.map((member, idx) => (
            <div key={idx} className="col-md-4">
              <div 
                className="team-card p-4 rounded h-100"
                style={{
                  background: "white",
                  borderTop: "5px solid #009688",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
              >
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-success mb-2">{member.role}</p>
                <p className="small text-muted">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped CSS for hover effect */}
      <style>
        {`
          .team-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 150, 136, 0.3);
          }
        `}
      </style>
    </section>
  )
}

export default TeamSection
