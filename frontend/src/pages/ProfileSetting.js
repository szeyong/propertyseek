import { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import "./stylepages.css";

const ProfileSetting = () => {
    // const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
  
    const { user, dispatch } = useContext(Context);

    const uri = "http://localhost:5000/api/"

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "UPDATE_START" });

        const updatedAgent = {
            userId: user._id,
            username,
            email,
            password,
        };

        try {
            const res = await axios.put(uri + "agent/" + user._id, updatedAgent);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Update Account</span>
            {/* <span className="settingsDeleteTitle">Delete Account</span> */}
            
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                    <input
                        className="form-control w-100"
                        id="floatingName"
                        type="text"
                        // placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <label for="floatingName">Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input
                        className="form-control w-100"
                        id="floatingEmail"
                        type="email"
                        // placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <label for="floatingEmail">Email</label>
                </div>
                <div className="form-floating mb-2">
                    <input
                        className="form-control w-100" 
                        id="floatingPassword"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <label for="floatingPassword">Password</label>
                </div>
                <button className="btn bg-secondary btn-block btn-lg gradient-custom-4 text-white" type="submit">
                    Update
                </button>

                {success && (
                    <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
                        Your profile has been updated!
                    </span>
                )}
            </form>
  
        </div>
    );
}

export default ProfileSetting
