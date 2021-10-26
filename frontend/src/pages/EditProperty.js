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
    // const [photo2, setPhoto1] = useState("");
    // const [photo3, setPhoto1] = useState("");
    
    const [data, setData] = useState([]);

    // const [property, setProperty] = useState("");
    const [alertmsg, setAlertmsg] = useState("");

    const { user } = useContext(Context);
    const username = user.username;

    const location = useLocation();
    console.log("location ID:", location.pathname.split("/")[2]) 
    const idPath = location.pathname.split("/")[2]; 
    

    const uri = "http://localhost:5000/api/"

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
        console.log(base64);
        setPhoto1(base64);
    };

    useEffect(() => {
        axios.get((uri + `property/${idPath}`))
        .then(response =>{
            console.log('received data');
            console.log(response.data);
            setTitle(response.data.title)
            setDescription(response.data.description);
            setCategory(response.data.category);
            setAddress(response.data.address);
            setDistrict(response.data.district);
            setPrice(response.data.price);
            setSqft(response.data.sqft);
            setBedrooms(response.data.bedrooms);
            setPhoto1(response.data.photo1)
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    },[])

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
            photo1
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

        // axios.post(("/property", newProperty)
        //     .then(res =>{
        //         console.log('posted', res);
        //         setTitle('');
        //         setDescription('');
        //         setCategory('');
        //         setAddress('');
        //         setDistrict('');
        //         setPrice('');
        //         setSqft('');
        //         setBedrooms('');
        //         setPhoto1('')
        //         window.location = "../home";
        //     })
        //     .catch((error)=> {
        //         console.log({status: 'bad', msg: error.message})
        //     })
        // )
    };

    return (
        <div className="center mt-4">
        <form onSubmit={handleSubmit}>                   
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="inputTitle" value={title} onChange={(e)=> setTitle(e.target.value)} type="text" placeholder="Title"/>
                    <label for="inputTitle">Title</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="inputDesc" onChange={(e)=> setDescription(e.target.value)} value={description} type="text" placeholder="Description"/>
                    <label for="inputDesc">Short Description</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <select className="form-select" id="floatingCat" onChange={(e)=> setCategory(e.target.value)} value={category}>
                        <option selected>Choose a category</option>
                        <option value="Landed">Landed</option>
                        <option value="Condominium">Condominimum</option>
                        <option value="HDB">HDB</option>
                    </select>
                    <label for="floatingCat">Property Category</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="inputAddress" onChange={(e)=> setAddress(e.target.value)} value={address} type="text" placeholder="Address"/>
                    <label for="inputAddress">Address</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <select className="form-select" id="floatingDistrict" onChange={(e)=> setDistrict(e.target.value)} value={district}>
                        <option selected>Choose a district</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <label for="floatingDistrict">District</label>
                </div>
                <div className="form-floating mt-2 mb-2">  
                    <input className="form-control w-70" id="inputPrice" onChange={(e)=> setPrice(e.target.value)} value={price} type="text" placeholder="Price"/>
                    <label for="inputPrice">Price</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="inputSqft" onChange={(e)=> setSqft(e.target.value)} value={sqft} type="text" placeholder="Sqft"/>
                    <label for="inputSqft">`Size (in sqft)`</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="inputBedrooms" onChange={(e)=> setBedrooms(e.target.value)} value={bedrooms} type="text" placeholder="Bedrooms"/>
                    <label for="inputBedrooms">Number of Bedrooms</label>
                </div>
                <div className="input-group mt-2 mb-7">    
                    <input className="form-control" id="fileUpload" onChange={handlePhoto1} type="file" placeholder="Image" accept=".jpeg, .png, .jpg"/>
                </div>
                {photo1 ? <img className="mt-2 mb-7" src={photo1} alt=""/> : <img className="mt-2" src="https://via.placeholder.com/400x250.png?text=No+Image+Selected" alt=""/>}
            <br/>
            <br/>
            {alertmsg} 
            <button className="btn btn-dark text-white mt-4" onClick={handleSubmit} href="./" >Update Property</button>
        </form>
    </div>
    );
};

export default EditProperty
