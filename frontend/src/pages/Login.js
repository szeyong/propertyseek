import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";
import "./stylepages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);

    const uri = "http://localhost:5000/api/"

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "LOGIN_START" });

        // api call to authenticate login credentials
        try {
            const res = await axios.post(uri + "auth/login", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    console.log(user);
    console.log(isFetching)

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100"
                        id="floatingName"
                        type="text" 
                        placeholder="Enter username" 
                        ref={usernameRef}
                    />
                    <label for="floatingName">Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100" 
                        id="floatingPassword"
                        type="password" 
                        placeholder="Enter password"
                        ref={passwordRef}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <button className="btn bg-secondary btn-block btn-lg gradient-custom-4 text-white" type="submit" disabled={isFetching}>Login</button>
            </form>
            <hr/>
            <div>
                <Link className="text-center text-muted mt-5 mb-0" to="/register" style={{color: "#808080"}}>Register new account</Link>
            </div>
        </div>
    )
}

export default Login
