import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./style.css";

const Navbar = () => {
    // const user = false;
    const { user, dispatch } = useContext(Context);

    // const ImageFolderUri = "http://localhost:5000/images/";

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
      <div className="nav">
        <div className="navLeft">
            <ul className="navList">
                <li className="navListItem">
                    <Link className="link" to="/">Home</Link>
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
                <li className="navListItem">
                    <Link to={`/?category=Landed`} className="link">Landed</Link>
                </li>
                <li className="navListItem">
                    <Link to={`/?category=Condominium`} className="link">Condominium</Link>
                </li>
                <li className="navListItem">
                    <Link to={`/?category=HDB`} className="link">HDB</Link>
                </li>
            </ul>
        </div>

        <div className="navRight">
        {user ? (
            <ul className="navList">
                <li className="navListItem">
                    Welcome {user.username}!
                </li>
                <li className="navListItem">
                    <Link className="link" to="/settings">
                        Settings
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
            {/* <li className="navListItem">
                <Link className="link" to="/register">
                    REGISTER
                </Link>
            </li> */}
          </ul>
        )}
        {/* <i className="navSearchIcon fas fa-search"></i> */}
      </div>
      </div>
    );
}

export default Navbar
