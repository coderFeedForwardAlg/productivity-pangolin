// notes for user auth https://blog.logrocket.com/user-authentication-firebase-react-apps/
import React, {useEffect, useState} from "react";
import { Link, useHistory} from "react-router-dom"; // not sure that useNavigat is nessisary 
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import { css } from '@emotion/css';
import { Background } from "./styles/Background";
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
        if (user) history.push("/library"); // use history  
    }, [user,loading]);

    return ( 
        <Background colorL={color[1]}  colorR={color[2]}>
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
        </Background>
     );
}
 
export default Longin;