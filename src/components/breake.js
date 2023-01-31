import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import sound from './sound/mixkit-attention-bell-ding-586.wav';
import { Button2 } from "./styles/Button";
import { css } from '@emotion/css';
import { useSelector } from "react-redux";

const Break = () => {
    const { timeparam } = useParams();
    const [time, setTime] = useState(timeparam * 60); 
    const [countDownTime, setCountDownTime] = useState(new Date().getTime() + time * 1000);
    const history = useHistory();
    const audio = new Audio(sound);
    const color = useSelector((state) => state.color.value);

    useEffect(()=>{
        const interval = setInterval(()=>{
            clearInterval(interval);
            let now = new Date().getTime();
            let distance = (countDownTime - now);
            let seconds = Math.floor((distance) / 1000);
            setTime(seconds);
        }, 1000); 
        if(time <= 0){
            audio.play();
            history.push("/work");
        }
    },[time]);

    const displayTime = ()=>{
        let min = Math.floor(time / 60);
        let sec = time % 60; 
        if(sec < 10){
            return `${min}:0${sec}`;
        }
        return `${min}:${sec}`; 
    }
    document.title =  displayTime() + " Productivity Pangolin";
    return ( 
        <div className={css`
            background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
            text-align: center;
            font-size: 200px; 
            width: 100%;
            background-size: cover;
            height: 100vh;
        `}>
            <h3 className='timer-text'>Break Time!</h3>
            {displayTime()}
        </div>
     );
}
 
export default Break;