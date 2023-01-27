import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";



    // for redux 
import {useSelector} from "react-redux";


import { css, keyframes} from '@emotion/css';
 
const NavBar = () => {
    const [user] = useAuthState(auth);
    let title = "login";
    let link = "/login";
    if(user){
        title = "logout";
        link = "/logout";
    }

    const [visible, setVisible]= useState("none");
    const menu = () =>{
        if(visible == "none"){
            setVisible("grid");
        }else{
            setVisible("none");
        }
    }
    

        // for redux
    const color  = useSelector((state) => state.color.value);
    
    const move = keyframes`
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    `

    
    return (
        <nav className="nav-bar">
            
            <ul className={css`

                display: none;
                background-color: ${color[3]};
                position: fixed;
                padding: 0%;
                margin-top: 0%;
                font-size: 25px;
                @media(max-width: 420px){
                    display: block;
                }
                    
            `} onClick={menu}>Menu</ul>
            <ul className={css`
                list-style-type: none;
                margin: 0;
                padding: 10px;
                overflow: hidden;
                background-color: ${color[3]};
                @media (max-width: 420px){
                    display: ${visible};
                    grid-template-columns: 45%;
                    animation: ${move} 1s;
                }
                
            `}>
                
                <li> <Link to="/landing" className='brandLink'><h1>Productivity Pangolin</h1> </Link></li>
                <li><Link to="/work" className='brandLink'><h1>Work</h1> </Link> </li>
                <li><Link to={link} className='brandLink'><h1>{title}</h1> </Link> </li>
                <li><Link to="/display" className='brandLink'><h1>Data</h1> </Link></li> 
                <li><Link to="/settings" className='brandLink'><h1> Settings</h1> </Link></li>
            </ul>
            
        </nav>

    );
}


export default NavBar;