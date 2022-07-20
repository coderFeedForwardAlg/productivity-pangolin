import { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Timer = () => {
   const { id } = useParams();
   const [time, setTime] = useState(id * 60);
   const history = useHistory();
   const [pauseText, setPauseText] = useState("Pause Timer");
   const [paused, setPaused] = useState(false); 
   const [countDownTime, setCountDownTime] = useState(new Date().getTime() + time * 1000);
   const [offset, setOffset] = useState(1);

   const displayTime = ()=>{
       let min = Math.floor(time / 60);
       let sec = time % 60; 
       if(sec < 10){
        return `${min}:0${sec}`;
       }
       return `${min}:${sec}`; 
   }

   useEffect(()=>{
    let interval = null; 
    interval = setInterval(()=>{
        let now = new Date().getTime();
        let distance = (countDownTime - now);
        let seconds = Math.floor((distance) / 1000);
        seconds += offset;
        if(!paused){
            setTime(seconds);
            console.log(time);
        }else{
            setOffset(offset + 1);
            console.log(offset);
        }
        clearInterval(interval);
    }, 1000);
        

     if(time <= 0){
         history.push("/goodWork");
     }
       
    },[time, offset]);

const pause = () => {
    if(!paused){
        setPaused(true);
        setPauseText("Start Timer");
        console.log(paused);
    }
    if(paused){
        setPaused(false);
        setPauseText("Pause Timer");
        console.log(paused);
    }
   }


    return ( 
        <div className="timer">
            {displayTime()}
            <br/>
            <button className='pauseButton' onClick={pause}>
                {pauseText}
            </button>
        </div>
     );
}
 
export default Timer;