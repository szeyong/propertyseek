import axios from "axios";
import { useState } from "react";
import "./stylepages.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const uri = "http://localhost:5000/api/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)

        try {
            const res = await axios.post(uri + "auth/register", {
                username, email, password,
            });

            res.data && window.location.replace("/login"); 
            // after register success, go to login page

        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Register</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100"
                        id="floatingName" 
                        type="text" 
                        placeholder="Enter username" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label for="floatingName">Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100" 
                        id="floatingEmail"
                        type="text" 
                        placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floatingEmail">Email</label>
                </div>
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100" 
                        id="floatingPassword"
                        type="password" 
                        placeholder="Enter password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <button className="btn bg-secondary btn-block btn-lg gradient-custom-4 text-white" type="submit">Register</button>
            </form>
            {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        </div>
    )
}

export default Register
