
// photo licenc agreement: https://www.shutterstock.com/license
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import pangolinPic from './imgs/pangolinImg.png';
import StudyMusic from "./StudyMusic";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {Background} from './styles/Background';
import { css } from '@emotion/css'
import { useSelector } from "react-redux";
import {Button2} from './styles/Button';

const NewWorkSesh = () => {
    const [user] = useAuthState(auth);
    const [notLogIn, setNotLogIn] = useState(<div> </div>)
    const [time, setTime] = useState(25);
    const color = useSelector((state) => state.color.value);
    
    const history = useHistory();

    
        // for when user hits enter insted of using button 
        // TODO: this uses deprecated code 
      document.onkeydown = function(e){
        e = e || window.event;
        let key = e.which || e.keyCode;
        if(key===13){
            start();
        }
    }

    const start = ()=>{
        // if user them card 
        if(user){
            history.push(`/timer/${time}`);
        }else{
            setNotLogIn(
                <div className="card"> 
                     You are not loged in <br /> do you want to continue without saving your work?
                    <br />  
                    <button className="pauseButton" onClick={logIn}> Log In</button>
                    <br />
                    <button className="pauseButton" onClick={startAnyway}> Continue</button>
                </div>
            );
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
                
            <img src = {pangolinPic} style={{ width: '400px', float: "left"}}/>
            <form>
                <label id="new-work-lable"><h2>How Long Do You Want To Work</h2></label>
                <input placeholder="25" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                
            </form>
            {notLogIn}
                {/* TODO: make button 1 (start button)  */}
            <Button2 className={css`
                background-color: ${color[0]}; 
            `} onClick={start}>Start</Button2>
            {/* <StudyMusic /> */}
            
        </div>
     );
}
 
export default NewWorkSesh;