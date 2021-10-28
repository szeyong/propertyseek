import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Context } from "../context/Context";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const EditProperty = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [price, setPrice] = useState("");
    const [sqft, setSqft] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [photo1, setPhoto1] = useState("");
    const [photo2, setPhoto2] = useState("");
    const [photo3, setPhoto3] = useState("");
    
    const [alertmsg, setAlertmsg] = useState("");

    const { user } = useContext(Context);
    const username = user.username;

    const uri = "http://localhost:5000/api/"

    const location = useLocation();
    console.log("location ID:", location.pathname.split("/")[2]) 
    const idPath = location.pathname.split("/")[2]; 

    useEffect(() => {
        axios.get((uri + `property/${idPath}`))
        .then(response => {
            console.log("EditProperty response data:",response.data);
            setTitle(response.data.title)
            setDescription(response.data.description);
            setCategory(response.data.category);
            setAddress(response.data.address);
            setDistrict(response.data.district);
            setPrice(response.data.price);
            setSqft(response.data.sqft);
            setBedrooms(response.data.bedrooms);
            setPhoto1(response.data.photo1)
            setPhoto2(response.data.photo2)
            setPhoto3(response.data.photo3)
        })
        .catch((error) => {
            console.log({status: 'bad', msg: error.message})
        })
    },[idPath]) // when idPath changes, activate useEffect

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handlePhoto1 = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPhoto1(base64);
    };
    const handlePhoto2 = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPhoto2(base64);
    };
    const handlePhoto3 = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPhoto3(base64);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateProperty = {
            username,
            title,
            description,
            category,
            address,
            district,
            price,
            sqft,
            bedrooms,
            photo1,
            photo2,
            photo3
        };

        if (!(title && description && category && address && district && price && sqft && bedrooms)){
            setAlertmsg(
                <Alert variant="danger" onClose={() => setAlertmsg(false)} dismissible>
                    <Alert.Heading>Please enter all fields!</Alert.Heading>
                </Alert>
                )
        } else if (isNaN(district)){
            console.log(district)
            setAlertmsg(                
                <Alert variant="danger" onClose={() => setAlertmsg(false)} dismissible>
                    <Alert.Heading>District should be a number!</Alert.Heading>
                </Alert>
                )
        } else if (isNaN(price)) {
            setAlertmsg(                
                <Alert variant="danger" onClose={() => setAlertmsg(false)} dismissible>
                    <Alert.Heading>Price should be a number!</Alert.Heading>
                </Alert>
                )
        } else if (isNaN(sqft)) {
            setAlertmsg(                
                <Alert variant="danger" onClose={() => setAlertmsg(false)} dismissible>
                    <Alert.Heading>Measurement should be a number!</Alert.Heading>
                </Alert>
                )
        } else if (isNaN(bedrooms)) {
            setAlertmsg(                
                <Alert variant="danger" onClose={() => setAlertmsg(false)} dismissible>
                    <Alert.Heading>Bedrooms should be a number!</Alert.Heading>
                </Alert>
                )
        }

        try {
            await axios.put(uri + "property/edit/" + idPath, updateProperty);
            window.location.replace("/" );
            // window.location.replace("/property/" + res.data._id);

        } catch (err) {}
    };

    return (
        <div className="d-flex justify-content-center align-items-center container mt-4">
        <form onSubmit={handleSubmit}>                   
                <div className="form-floating mt-2 mb-2">    
                    <input 
                        className="form-control w-70" 
                        id="inputTitle" 
                        value={title} 
                        onChange={(e)=> setTitle(e.target.value)} 
                        type="text" 
                        placeholder="Title"
                    />
                    <label for="inputTitle">Title</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input 
                        className="form-control w-70" 
                        id="inputDesc" 
                        onChange={(e)=> setDescription(e.target.value)} 
                        value={description} 
                        type="text" 
                        placeholder="Description"
                    />
                    <label for="inputDesc">Short Description</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <select 
                        className="form-select w-70" 
                        id="floatingCat" 
                        onChange={(e)=> setCategory(e.target.value)} 
                        value={category}>
                            <option selected>Choose a category</option>
                            <option value="Landed">Landed</option>
                            <option value="Condominium">Condominimum</option>
                            <option value="HDB">HDB</option>
                    </select>
                    <label for="floatingCat">Property Category</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input 
                        className="form-control w-70" 
                        id="inputAddress" 
                        onChange={(e)=> setAddress(e.target.value)} 
                        value={address} type="text" 
                        placeholder="Address"
                    />
                    <label for="inputAddress">Address</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <select 
                        className="form-select w-70" 
                        id="floatingDistrict" 
                        onChange={(e)=> setDistrict(e.target.value)} 
                        value={district}>
                            <option selected>Choose a district</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="21">21</option>
                    </select>
                    <label for="floatingDistrict">District</label>
                </div>
                <div className="form-floating mt-2 mb-2">  
                    <input 
                        className="form-control w-70" 
                        id="inputPrice" 
                        onChange={(e)=> setPrice(e.target.value)} 
                        value={price} 
                        type="text" 
                        placeholder="Price"
                    />
                    <label for="inputPrice">Price</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input 
                        className="form-control w-70" 
                        id="inputSqft" 
                        onChange={(e)=> setSqft(e.target.value)} 
                        value={sqft} 
                        type="text" 
                        placeholder="Sqft"
                    />
                    <label for="inputSqft">`Size (in sqft)`</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input 
                        className="form-control w-70" 
                        id="inputBedrooms" 
                        onChange={(e)=> setBedrooms(e.target.value)} 
                        value={bedrooms} 
                        type="text" 
                        placeholder="Bedrooms"
                    />
                    <label for="inputBedrooms">Number of Bedrooms</label>
                </div>
                <div className="input mt-2 mb-7">    
                    <input 
                        className="form-control w-70" 
                        id="fileUpload" 
                        onChange={handlePhoto1} 
                        type="file" 
                        placeholder="Image" 
                        accept=".jpeg, .png, .jpg"
                    />
                    <input 
                        className="form-control w-70" 
                        id="fileUpload" 
                        onChange={handlePhoto2} 
                        type="file" 
                        placeholder="Image" 
                        accept=".jpeg, .png, .jpg"
                    />
                    <input 
                        className="form-control w-70" 
                        id="fileUpload" 
                        onChange={handlePhoto3} 
                        type="file" 
                        placeholder="Image" 
                        accept=".jpeg, .png, .jpg"
                    />
                </div>
                {photo1 ? <img 
                            className="img-thumbnail w-25 p-3 mt-2 mb-7" 
                            src={photo1} 
                            alt=""/> 
                        : <img 
                            className="mt-2" 
                            src="https://via.placeholder.com/400x250.png?text=No+Image+Selected" 
                            alt=""/>
                }
                {photo2 ? <img 
                            className="img-thumbnail w-25 p-3 mt-2 mb-7" 
                            src={photo2} 
                            alt=""/> 
                        : <img 
                            className="mt-2" 
                            src="https://via.placeholder.com/400x250.png?text=No+Image+Selected" 
                            alt=""/>
                }
                {photo3 ? <img 
                            className="img-thumbnail w-25 p-3 mt-2 mb-7" 
                            src={photo3} 
                            alt=""/> 
                        : <img 
                            className="mt-2" 
                            src="https://via.placeholder.com/400x250.png?text=No+Image+Selected" 
                            alt=""/>
                }
            <br/>
            <br/>
                {alertmsg} 
            <div class="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-dark text-white mt-4 mb-5" onClick={handleSubmit} href="./" >Update Property</button>
            </div>
        </form>
    </div>
    );
};

export default EditProperty
