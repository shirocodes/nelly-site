import React from "react";
import { useParams, Link } from "react-router-dom";
import { servicesData } from "../../data/ServicesData";

const ServiceDetail = () => {
    const {category} = useParams()
    const service = servicesData.find(item => item.category === category)

    if(!service) {
        return <p className="text-center mt-3"> Sorry, service not found</p>
    }

    const {title, image, details} = service

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img 
                        src={image}
                        alt={title}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6">
                    <h2>{title}</h2>
                    <p>{details.intro}</p>
                </div>
                <div className="mt-4">
                    <h4>How the service works</h4>
                    <ul>
                        {details.howItWorks.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                        <h5>Why it matters</h5>
                        <p><strong>Success rate:</strong>
                            {details.statistics.successRate}
                        </p>
                        <small className="text-muted">Source: 
                            {details.statistics.source}
                        </small>
                </div>
                {details.testimonial && (
                    <blockquote className="blockquote mt-3">
                        <p>"{details.testimonial}"</p>
                    </blockquote>
                )}

                <div className="mt-4">
                    <Link to='/book' className="btn btn-primary me-3">
                        Schedule a session
                    </Link>
                    <Link to='/services' className="btn btn-outline-secondary">
                        Back to services
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceDetail