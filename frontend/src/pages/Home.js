import { useState, useEffect} from "react";
import "./home.css";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";

const Home = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchPropertyCards = async () => {
            const res = await axios.get("/api/property");
            setCards(res.data);
        }
        fetchPropertyCards();
    },[]);

    return (
        <div className="posts" >
            {cards.map( i => (
                <PropertyCard card={i} />
            ))}
            
        </div>
    )
}

export default Home
