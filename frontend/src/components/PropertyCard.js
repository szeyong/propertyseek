import React from 'react';
import { Link } from "react-router-dom";
import "./propertycard.css";

const PropertyCard = ({card}) => {
    return (
        <div className="post">
            {card.photo1 && (
                <img
                    className="postImg"
                    src={card.photo1}
                    alt="" 
                />
            )}
            <div className="postInfo">
                <span className="postCat">{card.category}</span>
                <span className="postCat">Located in District {card.district}</span>
                <Link to={`/api/property/${card._id}`} className="link">
                    <span className="postTitle">{card.title}</span>
                </Link>
                <span className="postTitle">
                    {(card.price).toLocaleString('en-US', {
                        style: 'currency', 
                        currency: 'USD', 
                        useGrouping: true,
                        maximumSignificantDigits: 3,
                    })}
                </span>
                <hr/>
                <span className="postDate">Posted on {new Date(card.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default PropertyCard;
