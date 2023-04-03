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
            `} onClick={endTimer}> End Break</Button2>
            <br />
            <Button2 className={css`
                    background-color: ${color[0]}; 
            `} onClick={dontEndTimer}> Don't End Break</Button2>
        </div>) 
    }

    const endTimer = () => {
        history.push("/work");
    } 
    const dontEndTimer = () => {
        setWantEndCard(<div> </div>)
    } 


    return ( 
        <div className={css`
            background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
            text-align: center;
            font-size: 200px; 
            width: 100%;
            background-size: cover;
            height: 100vh;
            color: ${color[4]};
        `}>
            {wantEndCard}
            <h3 className={css`
                font-size: 40px;
                padding-top: 10%;
                color: ${color[4]};
            `}>Break Time!</h3>
            {displayTime()}
            <br/>
            <Button2 className={css`
                background-color: ${color[0]}; 
                color: ${color[4]};
            `} onClick={wantToEndTimer}> End Break</Button2>
            <h3 className={css`
                font-size: 30px;
                color: ${color[4]};
            `}>break checklist!
            <p>exersize <input type="checkbox"/></p>
            <p>read acomplishments <input type="checkbox"/></p>
            <p>walk <input type="checkbox"/></p>
            </h3>
        </div>
     );
}
 
export default Break;