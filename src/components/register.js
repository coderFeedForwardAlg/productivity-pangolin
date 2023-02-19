import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import "../register.css"
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../firebase-config";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const register = () => {
        if(!name) alert("please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect( () => {
        if (loading) return;
        if (user) history.push("/work");
    }, [user, loading]);

    return ( 
    <div className="longin">
        <div className="login-container">
            <input 
                type="text"
                className="register-textbox"
                value={name}
                onChange = { (e) => {
                    setName(e.target.value)
                }}
                placeholder="Full Name"
             />
             <input 
                type="text" 
                className="register-textbox"
                value={email}
                onChange={ (e) => {
                    setEmail(e.target.value)
                }}
                placeholder="Email Address"
             />
             <input 
                type="password"
                className = "register-textbox"
                value={password}
                onChange= {(e) => {
                    setPassword(e.target.value)
                }}
                placeholder="Password"
             />
             <button className="longin-btn" onClick={register}>
                 Register
             </button>
            <button className="longin-btn"  onClick={signInWithGoogle}>
                 Register with Google
            </button>
             <div>
                 Already have an account? <Link to="login">Login</Link> now.
             </div>
        </div>
    </div> );
}
 
export default Register;





