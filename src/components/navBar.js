import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import React, { useState, useEffect } from "react";
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

     

    

        // for redux
    const color  = useSelector((state) => state.color.value);
    
    const moveIn = keyframes`
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    `
         
    const moveOut = keyframes`
        from {
            transform: translateX(0%);
        }
        to {
            transform: translateX(-100%);
        }
    `

    const [move, setMove] = useState(moveOut);
    const [visible, setVisible]= useState("none");
    const menu = () =>{
        if(move == moveIn){
            setMove(moveOut);
            setTimeout(function() {
                setVisible("none");
            }, 900);
            
        }else{
            setMove(moveIn);
            setVisible("grid");
        }
    }
    
    
    return (
        <nav className="nav-bar">
            
            <ul className={css`

                display: none;
                background-color: ${color[3]};
                position: fixed;
                padding: 0%;
                margin-top: 0%;
                font-size: 25px;
                z-index: 2;
                @media(max-width: 420px){
                    display: block;
                }
                    
            `} onClick={menu}>Menu</ul>


            <ul className={css`
                
                margin: 0;
                padding: 10px;
                list-style-type: none;
                position: absolute;
                width: 100%;
                background-color: ${color[3]};
                
                
                @media (max-width: 420px){
                    width: 50%;
                    grid-template-columns: 45%;
                    display: ${visible}; 
                    animation: ${move} 1s;
                    overflow: hidden;
                    
                    
                }
                
            `}>

                <li> <Link to="/landing" className='brandLink'><h1>Productivity Pangolin</h1> </Link></li>
                <li><Link to="/work" className='brandLink'><h1>Work</h1> </Link> </li>
                <li><Link to={link} className='brandLink'><h1>{title}</h1> </Link> </li>
                <li><Link to="/display" className='brandLink'><h1>Data</h1> </Link></li> 
                <li><Link to="/settings" className='brandLink'><h1> Settings</h1> </Link></li>
            </ul>

            

                {/* bad code here  */}
            <ul className={css`
                background-color: ${color[3]};
                z-index: 3 
                top:0px;
                left: 0;
                width: 100%;
                hight: 50%
                position: absolute;
                
            `}>
                
            </ul>
            
        </nav>

    );
}


export default NavBar;