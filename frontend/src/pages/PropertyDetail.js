import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./propertydetail.css";

const PropertyDetail = () => {
    const location = useLocation();
    console.log(location.pathname.split("/")[3]) // getting the id
    const idPath = location.pathname.split("/")[3]; 

    const [property, setProperty] = useState({});

    useEffect(() => {
        const getProperty = async () => {
            const res = await axios.get("/api/property/"+ idPath);
            console.log(res)
            setProperty(res.data)
        };
        getProperty()
    }, [idPath]);

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {property.photo1 && (
                    <img
                        className="singlePostImg"
                        src={property.photo1}
                        alt="" 
                    />
                )}
                <h1 className="singlePostTitle">
                    {property.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor"><b>{property.description} </b></span>
                    <span className="singlePostAuthor"> Location: <b>{property.address} </b></span>
                    <span className="singlePostAuthor"> Asking Price: <b>{property.price} </b></span>
                    <span className="singlePostAuthor"> Size: <b>{property.sqft} sqft </b></span>
                    <span className="singlePostAuthor"> Bedrooms: <b>{property.bedrooms} </b></span>
                    <span className="singlePostDate">Posted on {new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetail
