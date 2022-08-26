import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import sound from './sound/mixkit-attention-bell-ding-586.wav';


const Timer = () => {
   const { id } = useParams();
   const [time, setTime] = useState(id * 60);
   const history = useHistory();
   const [pauseText, setPauseText] = useState("Pause Timer");
   const [paused, setPaused] = useState(false); 
   const [countDownTime, setCountDownTime] = useState(new Date().getTime() + time * 1000);
   const [startPauseTime, setStartPauseTime] = useState(0);
   const audio = new Audio(sound);

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
        let distance = (countDownTime - now);
        let seconds = Math.floor((distance) / 1000);
        if(!paused){
            setTime(seconds);
            console.log(time);
        }
        clearInterval(interval);
    }, 1000 );
        

    if(time <= 0){
        audio.play();
        history.push(`/goodWork/${id}`);
    }
    
    const [wantEndCard, setWantEndCard] = useState(<div> </div>);

    const wantToEndTimer = () => {
        setWantEndCard(<div className="card"> 
            Do you want to end? 
            <br />
            <button className="pauseButton" onClick={endTimer}> end timer</button>
            <br />
            <button className="pauseButton" onClick={dontEndTimer}> dont end timer</button>
        
        </div>) 
    }

    const endTimer = () => {
        const  now = new Date().getTime();
        const distance = (countDownTime - now);
        const seconds = Math.floor((distance) / 1000);
        const timeDone = (id * 60 - seconds) / 60;
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
            {wantEndCard}
            <button className='pauseButton' onClick={pause}>
                {pauseText}
            </button>
            <button className="pauseButton" onClick={wantToEndTimer}> end timer</button>
        </div>
     );
}
 
export default Timer;