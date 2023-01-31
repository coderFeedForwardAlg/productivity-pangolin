import { css, keyframes } from '@emotion/css';
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Button2 } from "./styles/Button";
import music1 from './sound/Slavic_Lo-Fi.mp3';
const Music = () => {
    const color = useSelector((state) => state.color.value);
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
    const moveInOut = () =>{
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
        <div className={css`
            float:left;
            margin-top: 7%;
            z-index: 2;
        `}>
            <Button2 className={css`
                display: none;
                background-color: ${color[3]};
                // position: fixed;
                float: left;
                padding: 0%;
                font-size: 25px;
                display: block;
            `} onClick={moveInOut}>Music</Button2>


            <ul className={css`
                margin: 0;
                margin-top: 13%;
                padding: 10px;
                list-style-type: none;
                position: absolute;
                left: 0; 
                right: 0;
                background-color: ${color[3]};
                width: 25%;
                display: ${visible}; 
                animation: ${move} 1s;
                overflow: hidden;
                border-radius: 12px;

                @media(max-width: 720px){
                    width: 50%;
                    margin-top: 30%;
                }
            `}>
            <Button2 className={css`
                background-color: ${color[0]};    
            `}>Music1</Button2>
            <Button2 className={css`
                background-color: ${color[0]};    
            `}>Music2</Button2>
            <Button2 className={css`
                background-color: ${color[0]};    
            `}>Music3</Button2>
            </ul>
    </div> );
}
 
export default Music;