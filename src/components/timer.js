import { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Timer = () => {
   const { id } = useParams();
   const [time, setTime] = useState(id * 60);
   const history = useHistory();

   useEffect(()=>{
        const interval = setInterval(()=>{
            clearInterval(interval);
            setTime(time - 1);
        }, 1000); 
        if(time <= 0){
            history.push("/goodWork");
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
 
export default Timer;