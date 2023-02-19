
// photo licenc agreement: https://www.shutterstock.com/license
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import pangolinPic from './imgs/pangolinImg.png';
import StudyMusic from "./StudyMusic";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {Background} from './styles/Background';
import { css } from '@emotion/css';
import { useSelector } from "react-redux";
import {Button2} from './styles/Button';

const NewWorkSesh = () => {
    const [user] = useAuthState(auth);
    const [notLogIn, setNotLogIn] = useState(<div> </div>)
    const [time, setTime] = useState(25);
    const color = useSelector((state) => state.color.value);
    
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        start();
      }
    document.title =  "Pomodoro Timer: Productivity Pangolin";
    const start = ()=>{
        let s = time.toString(); 
        if (s.match(/[^0-9.]/)){
            alert("can only use numbers in the study time field");
        }else{
                // if user them card 
            if(user){
                history.push(`/timer/${time}`);
            }else{
                setNotLogIn(
                    <div className= {css`
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
                        You are not loged in <br /> do you want to continue without saving your work?
                        <br />  
                        <Button2 className={css`background-color: ${color[0]}; `} onClick={logIn}> Log In</Button2>
                        <br />
                        <Button2 className={css`background-color: ${color[0]}; `} onClick={startAnyway}> Continue</Button2>
                    </div>
                );
            }
        }
        
    }
    const startAnyway = () =>{
        history.push(`/timer/${time}`);
    }
    const logIn = () =>{
        history.push(`/login`);
    }
        //TODO: fix stile of pic 
    return ( 
        <div className={css`
            text-align: center;
            padding-top: 10%;
            background: linear-gradient(to left, ${color[1]}  0%, ${color[2]} 100%);
            background-size: cover;
            height: 100vh;
            
        `}>
            <div className={css`
                margin-left:10%;
                @media (max-width: 420px) {
                    display: grid;
                    grid-template-rows: 45%; 
                }
            `}>
                <img src = {pangolinPic} className={css`
                    width: 400px;
                    float: left;
                    @media (max-width: 420px) {
                        float: right; 
                        width: 200px;
                        margin-bottom: 30%;

                    }
                `} />
                <form  className={css`color: ${color[4]};`} onSubmit={handleSubmit}>
                    <label id="new-work-lable"><h2 className={css`color: ${color[4]};`}>How Long Do You Want To Work</h2></label>
                    <input placeholder="25" onChange={(e)=>{
                        setTime(e.target.value);
                    }}/>
                    {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                    <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                 </form>
                 <Button2 className={css`
                        background-color: ${color[0]};
                        color: ${color[4]};
                 `} onClick={start}>Start</Button2>
            </div>
                
            
            
            {notLogIn}
                {/* TODO: make button 1 (start button)  */}
            
            {/* <StudyMusic /> */}
            
        </div>
     );
}
 
export default NewWorkSesh;