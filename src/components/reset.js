
import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {auth, sendPasswordReset } from "../firebase-config";
//import "./Reset.css";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        if (loading) return;
        if (user) history.push("/dashboard");
    }, [user, loading]);
    return ( 
        <div className="reset">
            <div className="reset-container">
                <input 
                    type="text" 
                    className="reset-textbox"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    placeholder="E-mail Address"
                />
                <button
                    className="reset-btn"
                    onClick={()=>{
                        sendPasswordReset(email)
                    }}
                >
                    Send password reset email 
                </button>
                <div>
                    Don't have and account? <Link to="/register">Register now.</Link>
                </div>
            </div>
        </div>

     );
}
 
export default Reset;