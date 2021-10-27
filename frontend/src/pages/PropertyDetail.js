import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import axios from 'axios';
import NumberFormat from "react-number-format";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylepages.css";

const PropertyDetail = () => {
    const [property, setProperty] = useState({});
    const { user } = useContext(Context);
    // const [updateProperty, setUpdateProperty] = useState(false);
    // const [propertyId, setPropertyId] = useState("")

    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");

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

    // const handleUpdate = async () => {
    //     try {
    //         await axios.put(uri + `property/${property._id}`, {
    //             username: user.username,
    //             title,
    //             description,
    //         });
    //         setUpdateProperty(false)
    //     } catch (err) {}
    // };

    return (
        <div className=" rounded mx-auto mw-50">
            <div className="container">
                <div class="row justify-content-center">
                    <div class="col-4">
                        <img
                            className="card-img-top rounded float-left "
                            src={property.photo1}
                            // src={ImageFolderUri + property.photo1}
                            alt="" 
                        />
                    </div>
                    <div class="col-4">
                        <img
                            className="card-img-top rounded float-center"
                            src={property.photo2}
                            // src={ImageFolderUri + property.photo1}
                            alt="" 
                        />
                    </div>
                    <div class="col-4">
                        <img
                            className="card-img-top rounded float-right"
                            src={property.photo3}
                            // src={ImageFolderUri + property.photo1}
                            alt="" 
                        />
                    </div>
                </div>
            </div>
            <h1 className="card-title text-center mt-3">
                {property.title}
                {property.username === user?.username && (
                    <div className="singlePostEdit">
                        <Link to={`/edit/${idPath}`} className="link"><i className="singlePostIcon far fa-edit" href="/"></i></Link>
                        {/* <i className="singlePostIcon far fa-edit" onClick={() => setUpdateProperty(true)}></i> */}
                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                    
                )}
            </h1>

            <div className="container p-2">
                <dl class="row">
                    <dt class="col-sm-3 mt-5">Property Agent</dt>
                    <dd class="col-sm-9 mt-5">
                        <Link to={`/?user=${property.username}`} >
                            {property.username} 
                        </Link>
                    </dd>

                    <dt class="col-sm-3">Description</dt>
                    <dd class="col-sm-9">{property.description}</dd>

                    <dt class="col-sm-3">District</dt>
                    <dd class="col-sm-9">{property.district}</dd>

                    <dt class="col-sm-3">Asking Price</dt>
                    <dd class="col-sm-9">
                        <NumberFormat 
                            value={property.price} 
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                        />
                    </dd>
                    <dt class="col-sm-3">Location</dt>
                    <dd class="col-sm-9">{property.address}</dd>
                    <dt class="col-sm-3">Size</dt>
                    <dd class="col-sm-9">{property.sqft} sqft</dd>
                    <dt class="col-sm-3">Bedrooms</dt>
                    <dd class="col-sm-9">{property.bedrooms} rooms</dd>
                    <dt class="col-sm-3">Posted on</dt>
                    <dd class="col-sm-9 mb-5">{new Date(property.createdAt).toLocaleDateString()}</dd>
                </dl>
            </div> 
        </div>
    )
}

export default PropertyDetail
