import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import sound from './sound/mixkit-attention-bell-ding-586.wav';

const Break = () => {
    const { timeparam } = useParams();
    const [time, setTime] = useState(timeparam * 60); 
    const [countDownTime, setCountDownTime] = useState(new Date().getTime() + time * 1000);
    const history = useHistory();
    const audio = new Audio(sound);

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
    return ( 
        <div className="timer">
            {displayTime()}
        </div>
     );
}
 
export default Break;