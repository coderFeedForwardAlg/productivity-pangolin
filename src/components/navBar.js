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
            transform: translateX(200%);
        }
        to {
            transform: translateX(0%);
        }
    `
         
    const moveOut = keyframes`
        from {
            transform: translateX(0%);
        }
        to {
            transform: translateX(200%);
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
        <nav>
            
            <ul className={css`

                display: none;
                background-color: ${color[3]};
                float: right;
                /*position: fixed;*/
                padding: 0%;
                margin-top: 0%;
                font-size: 25px;
                z-index: 5;
                @media(max-width: 720px){
                    display: block;
                    padding: 10px;
                    border-radius: 20%;
                }
                    
            `} onClick={menu}>Menu</ul>


            <ul className={css`
                
                margin: 0;
                padding: 10px;
                list-style-type: none;
                position: absolute;
                left: 0; 
                right: 0;
                    /* changed to vw to ajust for smaller screans
                font-size: 1.4vw; */
                background-color: ${color[3]};
                z-index:4;
                
                @media (max-width: 720px){
                    position:fixed;
                    width: 50%;
                    left:50%;
                    top:45px;
                    grid-template-columns: 45%;
                    display: ${visible}; 
                    animation: ${move} 1s;
                    overflow: hidden;
                    border-radius: 5%;
                    
                    
                }
                
            `}>

                <li> <Link to="/landing" className='brandLink'><h1  className={css`color: ${color[4]};`}>Productivity Pangolin</h1> </Link></li>
                <li><Link to="/work" className='brandLink'><h1 className={css`color: ${color[4]};`}>Work</h1> </Link> </li>
                <li><Link to={link} className='brandLink'><h1 className={css`color: ${color[4]};`}>{title}</h1> </Link> </li>
                <li><Link to="/display" className='brandLink'><h1 className={css`color: ${color[4]};`}>Data</h1> </Link></li> 
                <li><Link to="/settings" className='brandLink'><h1 className={css`color: ${color[4]};`}> Settings</h1> </Link></li>
                <li><Link to="/call" className='brandLink'><h1 className={css`color: ${color[4]};`}> Accountability Call</h1> </Link></li>
            </ul>

            
            
        </nav>

    );
}


export default NavBar;