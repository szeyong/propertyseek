import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";


const PropertyCard = ({card}) => {
    console.log(card)
    const { user } = useContext(Context);
    
    return (
        <div className="card mx-auto mb-5">
            {card.photo1 && (
                <img
                    className="cardImg"
                    src={card.photo1}
                    alt="" 
                />
            )}
            <div className="cardInfo">
                <p className="card-text mt-2"><small className="text-muted">{card.category}</small></p>
                <p className="card-text fw-light text-success text-opacity-75">District {card.district}</p>
                <Link to={`/property/${card._id}`} className="link">
                    <h5 className="card-title fw-bold">{card.title}</h5>
                </Link>
                <span className="card-subtitle mb-2 text-muted">
                    {(card.price).toLocaleString('en-US', {
                        style: 'currency', 
                        currency: 'USD', 
                        useGrouping: true,
                        maximumSignificantDigits: 3,
                    })}
                </span>
                {card.username === user?.username && (
                    <div className="card-text fw-bold">
                        <Link to={`/edit/${card._id}`} className="card-link"><i className="singlePostIcon far fa-edit" href="/"></i></Link>
                    </div>
                )}
                <p className="card-text mt-2 fst-italic fw-light">
                    <small className="text-muted">
                        Property Agent : <Link to={`/?user=${card.username}`} > {card.username}</Link>
                    </small>
                </p>
                <p className="card-text">
                    <small className="text-muted">
                        Posted on {new Date(card.createdAt).toLocaleDateString()}
                    </small>
                </p>
            </div>
        </div>
    )
}

export default PropertyCard;
