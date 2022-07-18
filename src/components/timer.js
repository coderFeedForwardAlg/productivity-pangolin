import { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Timer = () => {
   const { id } = useParams();
   const [time, setTime] = useState(id * 60);
   const history = useHistory();
   const [pauseText, setPauseText] = useState("Pause Timer");
   const [paused, setPaused] = useState(false); 

   useEffect(()=>{
    let interval = null;
    if(!paused){
        interval = setInterval(()=>{
            
                clearInterval(interval);
                setTime(time - 1);
            
        }, 1000);
    }else {
        clearInterval(interval);
    }
        if(time <= 0){
            history.push("/goodWork");
        }
   },[time, paused]);

   const displayTime = ()=>{
       let min = Math.floor(time / 60);
       let sec = time % 60; 
       if(sec < 10){
        return `${min}:0${sec}`;
       }
       return `${min}:${sec}`; 
   }

   const pause = () => {
    if(!paused){
        setPaused(true);
        setPauseText("Start Timer");
    }else{
        setPaused(false);
        setPauseText("Pause Timer");
    }
   }


    return ( 
        <div className="timer">
            {displayTime()}
            <br />
            <button className='pauseButton' onClick={pause}>
                {pauseText}
            </button>
        </div>
     );
}
 
export default Timer;