import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {Button2} from './styles/Button';
import sound from './sound/mixkit-attention-bell-ding-586.wav';
import { css } from '@emotion/css';
import { useSelector } from "react-redux";


const Timer = () => {
   const { id } = useParams();
        // how long the timer should run in seconts 
   const [time, setTime] = useState(id * 60);
   const history = useHistory();
   const [pauseText, setPauseText] = useState("Pause Timer");
   const [paused, setPaused] = useState(false); 
   const [countDownTime, setCountDownTime] = useState(new Date().getTime() + time * 1000);
   const [startPauseTime, setStartPauseTime] = useState(0);
   const audio = new Audio(sound);
   audio.muted = true;
   audio.play();  // so the sound will play in bachground tab 
   const color = useSelector((state) => state.color.value);

    const displayTime = ()=>{
        let min = Math.floor(time / 60);
        let sec = time % 60; 
        if(sec < 10){
            return `${min}:0${sec}`;
        }
        return `${min}:${sec}`; 
    }

    let timePaused = 0; 
    let interval = null; 
    interval = setInterval(()=>{
        let now = new Date().getTime();
            // time to go untill timer will stop 
        let distance = countDownTime - now;
        let seconds = Math.floor((distance) / 1000);
        if(!paused){
            setTime(seconds);
            console.log(time);
        }
        clearInterval(interval);
    }, 1000 );

    if(time <= 0){
        audio.muted = false;
        audio.play();
        history.push(`/goodWork/${id}`);
    }
    
    const [wantEndCard, setWantEndCard] = useState(<div> </div>);

    const wantToEndTimer = () => {
        setWantEndCard(<div className={css`
            font-size: 20px;
            padding: 3%;
            background-color: ${color[1]};
            border: #000000;
            width: max-content;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: rotateX(0deg) translate(-50%, -50%);
            border-radius: 10%;
            border-style: solid;
        `}> 
            Do you want to end? 
            <br />  
            <Button2 className={css`
                background-color: ${color[0]}; 
            `} onClick={endTimer}> End Timer</Button2>
            <br />
            <Button2 className={css`
                    background-color: ${color[0]}; 
            `} onClick={dontEndTimer}> Don't End Timer</Button2>
        </div>) 
    }

    const endTimer = () => {
        const  now = new Date().getTime();
        //TODO: bug, if now is much later because timer is poused 
        let distance;
        if(!pause){
            distance = (countDownTime - now);
        }else{
            distance = countDownTime - (now + timePaused); 
        }
        const seconds = Math.floor((distance) / 1000);
        const timeDone = ( id * 60 - seconds) / 60;
        history.push(`/goodWork/${timeDone}`);
    } 
    const dontEndTimer = () => {
        setWantEndCard(<div> </div>)
    } 
   

const pause = () => {
    if(!paused){
        setStartPauseTime(new Date().getTime());
        console.log(startPauseTime)
        setPaused(true);
        setPauseText("Start Timer");
        console.log(paused);
    }
    if(paused){
        const unPause = new Date().getTime();
            //TODO: bug is still their (time still recorded when paused and then ended)
        
        timePaused = unPause - startPauseTime; 
        
        console.log(startPauseTime / 1000);
        console.log(unPause / 1000);
        console.log(timePaused / 1000);
        setCountDownTime(countDownTime + timePaused);
        setPaused(false);
        setPauseText("Pause Timer");
        console.log(paused);
    }
   }
   
    
   
    return ( 
        <div className={css`
            background: linear-gradient(to left,${color[1]}  0%,  ${color[2]}  100%);
            text-align: center;
            font-size: 200px; 
            width: 100%;
            background-size: cover;
            height: 100vh;
            @media (max-width: 420px){
                font-size: 50px; 
            }
        `}>
            <h3 className='timer-text'>Work Time!</h3>
            {displayTime()}
            <br/>
            {wantEndCard}
            <Button2 className={css`
                background-color: ${color[0]};    
            `}  onClick={pause}>
                {pauseText}
            </Button2>
            <Button2 className={css`
                background-color: ${color[0]};    
            `} onClick={wantToEndTimer}> End Timer</Button2>
            

        </div>
     );
}
 
export default Timer;