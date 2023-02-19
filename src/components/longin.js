// notes for user auth https://blog.logrocket.com/user-authentication-firebase-react-apps/
import React, {useEffect, useState} from "react";
import { Link, useHistory} from "react-router-dom"; // not sure that useNavigat is nessisary 
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import { css } from '@emotion/css';
import { useSelector } from "react-redux";
import { Button2 } from "./styles/Button";
import "../login.css";


const Longin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const color = useSelector((state) => state.color.value);
    const history = useHistory();
    useEffect(() => {
        if (loading){
                // TODO: trigger loading screen 
            return; 
        }
        if (user) history.push("/work"); // use history  
    }, [user,loading]);

    return ( 
        <div className={css`
            background: linear-gradient(to left,${color[1]}  0%,  ${color[2]} 100%);
            background-size: cover;
            height: 100vh;
        `}>
            <div className="login-container">
                <input
                    type="text"
                    className="login-textbox"
                    value={email}
                    onChange = { (e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Email Address"
                />
                <input 
                    type="password" 
                    className="login-textbox"
                    value={password}
                    onChange= {(e) => {
                        setPassword(e.target.value)
                    }}
                    placeholder = "Password"
                />
                <button
                    className={css`
                        background-color: ${color[0]};
                        font-size: 30px;
                        padding: 5px;
                        color: ${color[4]};
                        margin-bottom: 20px;
                    `}
                    onClick= { ()=> {
                        logInWithEmailAndPassword(email, password)
                    }}
                >
                    Login
                </button>
                <button className={css`
                        background-color: ${color[0]};
                        font-size: 30px;
                        padding: 5px;
                        color: ${color[4]};
                        margin-bottom: 20px;
                    `} onClick={signInWithGoogle}>
                    Longin With Google
                </button>
                
                <div>
                    <Link to="/reset">Forgot Password</Link> 
                </div>
                <div>
                    Don't have and account? <Link to="/register">Register </Link> now. 
                </div>

            </div>
        </div>
     );
}
 
export default Longin;