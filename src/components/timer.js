import { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';


const Timer = () => {
   const { id } = useParams();
   const [time, setTime] = useState(id * 60);
   const history = useHistory();
   const [pauseText, setPauseText] = useState("Pause Timer");
   const [paused, setPaused] = useState(false); 
   const [countDownTime, setCountDownTime] = useState(new Date().getTime() + time * 1000);
   const [startPauseTime, setStartPauseTime] = useState(0);

   const displayTime = ()=>{
       let min = Math.floor(time / 60);
       let sec = time % 60; 
       if(sec < 10){
        return `${min}:0${sec}`;
       }
       return `${min}:${sec}`; 
   }
  const startTime = new Date().getTime();

  let timePaused = 0; 
   useEffect(()=>{
    let interval = null; 
    interval = setInterval(()=>{
        let now = new Date().getTime();
        let distance = (countDownTime - now);
        let seconds = Math.floor((distance) / 1000);
        if(!paused){
            setTime(seconds);
            console.log(time);
        }else{
            
        }
        clearInterval(interval);
    }, 1000 );
        

     if(time <= 0){
        history.push(`/goodWork/${id}`);
     }
       
    },[time, countDownTime]);

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