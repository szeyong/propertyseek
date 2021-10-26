import React from 'react';
import "./style.css";

const Topbanner = () => {
    return (
        <div className="banner">
            <div className="bannerTitles">
                <span className="bannerMainTitle">PROPERTYSEEK</span>
                <span className="bannerSubTitle">A boutique experience in house search</span>
            </div>
            <img
                className="bannerImg"
                src="../bannerImage.jpeg"
                alt="" 
            />
            
        </div>
    )
}

export default Topbanner
