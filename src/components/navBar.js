import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";



    // for redux 
import {useSelector} from "react-redux";


import { css } from '@emotion/css';
import { Button2 } from './styles/Button';
 
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
    

    
    return (
        <nav className="nav-bar">
            
            <Button2 className={css`

                display: none;
                background-color: ${color[3]};
                position: fixed;
                top: -20;
                left: -20;
                padding: 0%;
                margin-top: 0%;
                @media(max-width: 420px){
                    display: block;
                }
                    
            `} onClick={menu}>Menu</Button2>
            <ul className={css`
                list-style-type: none;
                margin: 0;
                padding: 10px;
                overflow: hidden;
                background-color: ${color[3]};
                @media (max-width: 420px){
                    display: ${visible};
                    grid-template-columns: 45%;
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