import { Button2 } from "./styles/Button";
import { css } from '@emotion/css';
import { useState } from "react";
import { useSelector } from "react-redux";
import { Background } from "./styles/Background";

const Landing = () => {
    const color = useSelector((state) => state.color.value);
    const killCard = () =>{
        setEvent(<div></div>)
    }
    const [event, setEvent] = useState(<div className= {css`
            font-size: 20px;
            padding: 3%;
            background-color: ${color[1]};
            border: #000000;
            width: max-content;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: rotateX(0deg) translate(-50%, -50%);
            border-radius: 15px;
            border-style: solid;
        `}> 
            <h3>Their is a virtual event happening monday the 8th, from 7 to 9PM eastern time. <br/>
            Go to the library to join the event.</h3>
            <br />  
            <Button2 className={css`background-color: ${color[0]}; `} onClick={killCard}>Got it</Button2>
        </div>)

    return ( 
        <Background colorL={color[1]}  colorR={color[2]}>
            {event}
            <h1 className={css`color: ${color[4]};`}>
                Welcome to Productivity Pangolin. 
            </h1> 

            <br/>
            <h3 className={css`color: ${color[4]};`}>
                This is a great place to make sure you are working hard and taking breaks! <br/>
                Go to the work tab to start a work session. <br/>
                Go to the data tab to see your progress. <br/>
                Go to the Accountability Call tab to do work with a friend. <br/>
                Go to the Library tab to do work in the virtual library.<br/>
            </h3>
        </Background>
     );
}
 
export default Landing;