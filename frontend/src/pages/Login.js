import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";
import "./stylepages.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const { user, dispatch, isFetching } = useContext(Context);

    //sign new token with userinfo , send it with response
    function handleLogin(e){
        e.preventDefault();
        const data = {username,email,password};

        axios.post("http://localhost:5000/api/auth/login", data, {withCredentials:true})
        .then(response =>{
            console.log('response login',response)
            if (response.data==='issue' || response.data==="err"){
                const msg = (
                    <div class="alert alert-danger" role="alert">
                        <strong>Invalid Login</strong>
                    </div>
                )
                setMsg(msg)
                return
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
            window.location.href = "/"
        })
        .catch(()=> {
            return
        })
    }

    console.log("login user:", user);
    console.log("login isFetching:", isFetching)

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" action="" onSubmit={e=>handleLogin(e)}>
                {msg}
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100"
                        id="floatingName"
                        type="text" 
                        placeholder="Enter username" 
                        value={username} 
                        onChange={e=>setUsername(e.target.value)}
                    />
                    <label for="floatingName">Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100"
                        id="floatingEmail"
                        type="text" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <label for="floatingName">Email</label>
                </div>
                <div className="form-floating mb-2">
                    <input 
                        className="form-control w-100" 
                        id="floatingPassword"
                        type="password" 
                        placeholder="Enter password"
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <button 
                    className="btn bg-secondary btn-block btn-lg gradient-custom-4 text-white" 
                    type="submit">
                        Login
                </button>
            </form>
            <hr/>
            <div>
                <Link 
                    className="text-center text-muted mt-5 mb-0" 
                    to="/register" 
                    style={{color: "#808080"}}>
                        Register new account
                </Link>
            </div>
        </div>
    )
}

export default Login
