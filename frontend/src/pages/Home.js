import { useState, useEffect} from "react";
import { useLocation } from "react-router";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";
import "./stylepages.css";

const Home = () => {
    const [cards, setCards] = useState([]);
    const {search} = useLocation();
    console.log("search:", search)

    const uri = "http://localhost:5000/api/"

    useEffect(() => {
        const fetchPropertyCards = async () => {
            const res = await axios.get(uri + "property" + search);
            setCards(res.data);
        }
        fetchPropertyCards();
    },[search]);
    
    console.log("cards: ", cards)

    return (
        <div className="posts" >
            {cards.map( (i) => (
                <PropertyCard card={i} />
            ))}
        </div>
    )
}

export default Home
