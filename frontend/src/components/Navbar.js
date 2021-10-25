import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const user = true;
    return (
      <div className="nav">
        <div className="navLeft">
            <ul className="navList">
                <li className="navListItem">
                    <Link className="link" to="/">Home</Link>
                </li>
                <li className="navListItem">
                    <Link className="link" to="/login">Login</Link>
                </li>
                <li className="navListItem">
                    <Link className="link" to="/register">Register</Link>
                </li>
            </ul>
        </div>
        <div className="navCenter">
            <ul className="navList">
                <li className="navListItem">Landed</li>
                <li className="navListItem">Condominium</li>
                <li className="navListItem">HDB</li>
            </ul>
        </div>
        <div className="navRight">
            <img 
                className="navProfileImg"
                src="https://i.mydramalist.com/ej4LE_5c.jpg"
                alt=""
            />
            <i className="navSearchIcon fas fa-search"></i>
        </div>
      </div>
    );
}

export default Navbar
