import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { Context } from "../context/Context";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./stylepages.css";

const PropertyDetail = () => {
    const [property, setProperty] = useState({});
    const { user } = useContext(Context);
    const [updateProperty, setUpdateProperty] = useState(false);
    // const [propertyId, setPropertyId] = useState("")

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const location = useLocation();
    console.log(location.pathname.split("/")[2]) 
    const idPath = location.pathname.split("/")[2]; 
    // splitting the pathname and getting only the exact id
    // eg. pathname: [0]/property[1]/3243254235435[2] 
    // setPropertyId(idPath);

    const uri = "http://localhost:5000/api/"

    // const ImageFolderUri = "http://localhost:5000/images/";

    useEffect(() => {
        const getProperty = async () => {
            const res = await axios.get(uri + "property/"+ idPath);
            console.log(res)
            setProperty(res.data)
        };
        getProperty()
    }, [idPath]);  // when idPath changes, activate useEffect

    const handleDelete = async () => {
        try {
            await axios.delete(uri + `property/${property._id}`, {
                data: { username: user.username },
            });
            window.location.replace("/");
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(uri + `property/${property._id}`, {
                username: user.username,
                title,
                description,
            });
            setUpdateProperty(false)
        } catch (err) {}
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {property.photo1 && (
                    <img
                        className="singlePostImg"
                        src={property.photo1}
                        // src={ImageFolderUri + property.photo1}
                        alt="" 
                    />
                )}
                { updateProperty ? (
                    <input 
                        type="text" 
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {property.title}
                        {property.username === user?.username && (
                            <div className="singlePostEdit">
                                <Link to={`/edit/${idPath}`} className="link"><i className="singlePostIcon far fa-edit" href="/"></i></Link>
                                {/* <i className="singlePostIcon far fa-edit" onClick={() => setUpdateProperty(true)}></i> */}
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                            
                        )}
                    </h1>
                )}
                
                <div className="singlePostInfo">
                    <ul class="list-group list-group-flush">
                        <li className="list-group-item">
                            Agent: 
                            <Link to={`/?user=${property.username}`} >
                                {property.username} 
                            </Link>
                        </li>
                        <li className="list-group-item">{property.description}</li>
                        <li className="list-group-item">District {property.district}</li>
                        <li className="list-group-item">Asking Price:  
                            <NumberFormat 
                                value={property.price} 
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        </li>
                        <li className="list-group-item"> Location: {property.address} </li>
                        <li className="list-group-item"> Size: {property.sqft} sqft </li>
                        <li className="list-group-item"> Bedrooms: {property.bedrooms} </li>
                        <li className="list-group-item">Posted on {new Date(property.createdAt).toLocaleDateString()}</li>
                    </ul>
                </div>

                {/* {updateProperty ? (
                    <textarea
                        className="singlePostDescInput"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    ) : (
                    <p className="singlePostDesc">{description}</p>
                )}
                {updateProperty && (
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                )} */}
            </div>
        </div>
    )
}

export default PropertyDetail
