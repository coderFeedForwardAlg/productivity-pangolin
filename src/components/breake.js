import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const Break = () => {
    const [time, setTime] = useState(5 * 60); // should be id 
    const history = useHistory();

    useEffect(()=>{
        const interval = setInterval(()=>{
            clearInterval(interval);
            setTime(time - 1);
        }, 1000); 
        if(time <= 0){
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