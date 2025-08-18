import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({title, description, image, detailsInfo}) => {
    return (
        <div className="card h-100 shadow-sm border-0"> 
            {image && (
                <img 
                    className="card-img-top img-fluid"
                    src={image}
                    alt={title}
                    style={{
                        objectFit: 'cover', 
                        width: '100%',
                        aspectRatio: '16/9'
                    }}
                />
            )}

            <div className="card-body d-flex flex-column">
                <h4 className="card-title">{title}</h4>
                <p className="card-text flex-grow-1">{description}</p>

                <div>
                    <Link 
                        to={`/services/${detailsInfo}`}
                        className="btn btn-primary btn-sm"
                    >
                        Learn More
                    </Link>
                    {/* <Link 
                        to="/book" className="btn btn-outline-secondary btn-sm"
                    >
                        Take Action
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default ServiceCard