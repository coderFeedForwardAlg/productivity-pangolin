import { css, keyframes } from '@emotion/css';
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button2, MusicButton } from "./styles/Button";

import 'font-awesome/css/font-awesome.min.css';

import slavic from './sound/Slavic_Lo-Fi.mp3';
import tokyo from './sound/Tokyo_Lo-Fi.mp3';
import retro from './sound/Retro_Platforming.mp3';
import time_Alone from './sound/Time_Alone.mp3';
import homework from './sound/Homework.mp3';
import dancing_In_The_Desert from './sound/Dancing_In_The_Desert.mp3';
import MusicPlayButton from './MusicPlayButton';


const Music = () => {
    const [audioSlavic, setAudioSlovic] = useState(new Audio(slavic));
    const [audioTokyo, setAudioTokyo] = useState(new Audio(tokyo));
    const [audioRetro, setAudioRetro] = useState(new Audio(retro));
    const [audioTimeAlone, setTimeAlone] = useState(new Audio(time_Alone));
    const [audioHomework, setAudioHomework] = useState(new Audio(homework));
    const [audioDancingDesert, setAudioDancingDesert] = useState(new Audio(dancing_In_The_Desert));
    const audioArr = [];
    audioArr[0] = audioSlavic; 
    audioArr[1] = audioTokyo;
    audioArr[2] = audioRetro;
    audioArr[3] = audioTimeAlone;
    audioArr[4] = audioHomework;
    audioArr[5] = audioDancingDesert;

    

    const color = useSelector((state) => state.color.value);

    


    const playMusic = (a) => {
        let pause = <i className="fa fa-pause"></i>;
        let play =  <i className="fa fa-play"></i>;
        for(let i = 0; i < audioArr.length; i++){
            if(i != a){
                audioArr[i].pause();
            }
            
        }

        if(!audioArr[a].paused){
            audioArr[a].pause();
        }else{
            audioArr[a].loop = true;
            audioArr[a].volume = 0.2;  
            audioArr[a].play();

        }
        
        

;
    }
    

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
    const[symbol, setSymbol] = useState("🎵");
    const moveInOut = () =>{
        if(symbol === "🎵"){
            setSymbol(" X ");
        }else{
            setSymbol("🎵");
        }
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
            margin-top: 90px;
            z-index: 2;
            @media(max-width: 720px){
                margin-top: 30px;
            }
        `}>
            <button className={css`
                display: none;
                background-color: ${color[3]};
                position: absolute;
                // float: left;
                padding: 0%;
                font-size: 25px;
                display: block;
                z-index: 3;
                border-radius: 6px;
                @media(max-width: 720px){
                    float: left;
                    left: 0; 
                    margin: 0px;
                }
            `} onClick={moveInOut}>{symbol}</button>


            <ul className={css`
                margin: 0;
                margin-top: 0%;
                padding: 10px;
                list-style-type: none;
                position: absolute;
                left: 0; 
                right: 0;
                background-color: ${color[3]};
                width: 25%;
                :focus {
                    width: 250px;
                }
                display: ${visible}; 
                animation: ${move} 1s;
                overflow: auto;
                
                max-height: 50vh;
                border-radius: 12px;

                @media(max-width: 720px){
                    width: 50%;
                    
                }
            `}>
            
            
            {/* <div onClick={() => playMusic(0)} >
                <MusicPlayButton icon1 = "fa fa-pause" icon2 = "fa fa-play" text = "Slavic Lo-Fi" />
            </div>

            
            <div onClick={() => playMusic(1)} >
                <MusicPlayButton icon1 = "fa fa-pause" icon2 = "fa fa-play" text = "Tokyo Lo-Fi" />
            </div> */}

            
            <MusicButton className={css`
                background-color: ${color[0]};
                color: ${color[4]};
            `} onClick={() => playMusic(0)}>Slavic Lo-Fi</MusicButton>

            <MusicButton className={css`
                background-color: ${color[0]};
                color: ${color[4]};    
            `} onClick={() => playMusic(1)}> Tokyo Lo-Fi</MusicButton>

            <MusicButton className={css`
                background-color: ${color[0]};
                color: ${color[4]};    
            `} onClick={() => playMusic(2)}>Retro Platforming</MusicButton>

            <MusicButton className={css`
                background-color: ${color[0]}; 
                color: ${color[4]};   
            `} onClick={() => playMusic(3)}>Time Alone</MusicButton>

            <MusicButton className={css`
                background-color: ${color[0]};   
                color: ${color[4]}; 
            `} onClick={() => playMusic(4)}>Homework</MusicButton>
            
            <MusicButton className={css`
                background-color: ${color[0]};   
                color: ${color[4]}; 
            `} onClick={() => playMusic(5)}>Dancing In The Desert</MusicButton>
            </ul>
    </div> );
}
 
export default Music;