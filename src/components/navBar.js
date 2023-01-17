import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs, setDoc, doc, getId } from "firebase/firestore"; 
import { db } from '../firebase-config'; // auth redundent 


    // for redux 
import { useDispatch, useSelector } from "react-redux";
import { setColorPurple, setColorGreen} from "../redux/color";

import { css } from '@emotion/css';
 
const NavBar = () => {
    const [user] = useAuthState(auth);
    let title = "login";
    let link = "/login";
    if(user){
        title = "logout";
        link = "/logout";
    }

        // for redux
    const color  = useSelector((state) => state.color.value);
    const dispatch = useDispatch();
    
    

    const updateColorPurple = async () => { 
        localStorage.setItem("color", "purple");   
        console.log(localStorage.getItem("color"));
        dispatch(setColorPurple());
    }
    const updateColorGreen = async () => {
        localStorage.setItem("color", "green");
        console.log(localStorage.getItem("color"));
        dispatch(setColorGreen());    
    }
    
    return (
        <nav className="nav-bar">
            <ul className={css`
                list-style-type: none;
                margin: 0;
                padding: 10px;
                overflow: hidden;
                background-color: ${color[3]};
                }
            `}>
                <li> <Link to="/landing" className='brandLink'><h1>Productivity Pangolin</h1> </Link></li>
                <li><Link to="/work" className='brandLink'><h1>Work</h1> </Link> </li>
                <li><Link to={link} className='brandLink'><h1>{title}</h1> </Link> </li>
                <li><Link to="/display" className='brandLink'><h1>Data</h1> </Link></li> 
                     {/* TODO: right to rierbase each color change */}
                <li><Link to="#" className='brandLink' ><h1 onClick={updateColorPurple}> purple theme </h1> </Link></li>
                <li><Link to="#" className='brandLink' ><h1 onClick={updateColorGreen}> green theme</h1> </Link></li>
                <li><Link to="/settings" className='brandLink'><h1> setings</h1> </Link></li>
                
            </ul>
        </nav>
    );
}


export default NavBar;