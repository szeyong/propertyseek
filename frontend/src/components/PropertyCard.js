import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import { useContext } from "react";
import { Context } from "../context/Context";

const PropertyCard = ({card}) => {
    console.log(card)
    const { user } = useContext(Context);
    
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
                <Link to={`/property/${card._id}`} className="link">
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
                {card.username === user?.username && (
                    <div className="singlePostEdit">
                        <Link to={`/edit/${card._id}`} className="link"><i className="singlePostIcon far fa-edit" href="/"></i></Link>
                    </div>
                )}
                <span className="postDate"><Link to={`/?user=${card.username}`} >{card.username}</Link></span>
                <span className="postDate">Posted on {new Date(card.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default PropertyCard;
