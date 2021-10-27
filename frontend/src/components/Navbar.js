import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./style.css";

const Navbar = () => {
    // const user = false;
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
    <div className="nav">
        <div className="navLeft">
            <ul className="navList">
                <li className="navListItem">
                    <Link className="link" to="/">
                        <i class="fas fa-house-user"></i>
                    </Link>
                </li>
                {user && 
                <li className="navListItem">
                    <Link className="link" to="/manage">
                        Add Property
                    </Link>
                </li>}
                {user && <li className="navListItem" onClick={handleLogout}>Logout</li>}
            </ul>
        </div>

        <div className="navCenter">
            <ul className="navList">
                <li className="navListItem fw-bold">
                    <Link to={`/?category=Landed`} className="link">Landed</Link>
                </li>
                <li className="navListItem fw-bold">
                    <Link to={`/?category=Condominium`} className="link">Condominium</Link>
                </li>
                <li className="navListItem fw-bold">
                    <Link to={`/?category=HDB`} className="link">HDB</Link>
                </li>
            </ul>
        </div>

        <div className="navRight">
        {user ? (
            <ul className="navList">
                <li className="navListItem">
                    <Link className="link" to={`/?user=${user.username}`}>
                        Welcome {user.username}!
                    </Link>
                </li>
                <li className="navListItem">
                    <Link className="link" to="/settings">
                        <i class="fas fa-user-cog"></i>
                    </Link>
                </li>
            </ul>
            // <Link className="link" to="/settings">
            //     <img
            //     className="navProfileImg"
            //     src={ImageFolderUri + user.profileImage}
            //     alt=""
            //     />
            // </Link>
        ) : (
            <ul className="navList">
                <li className="navListItem">
                    <Link className="link" to="/login">
                        Agent Login
                    </Link>
                </li>
            </ul>
        )}
        </div>
    </div>
    );
}

export default Navbar
