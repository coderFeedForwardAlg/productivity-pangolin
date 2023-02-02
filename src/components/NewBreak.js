import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button2 } from "./styles/Button";
import { css } from '@emotion/css';
import { useSelector } from "react-redux";

const NewBreak = () => {
    const [time, setTime] = useState(5);
    const color = useSelector((state) => state.color.value);

    const history = useHistory();

    const start = ()=>{
        history.push(`/break/${time}`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        start();
    }



    return ( 
        <div className={css`
            background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
            background-size: cover;
            height: 100vh;
            text-align: center;
            font-size: large;
            padding-top: 10%;
        `}>
            <form onSubmit={handleSubmit}>
                <h2 className={css`color: ${color[4]};`}>How Long Do You Want to Take a Break</h2>
                <input placeholder="5" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                
            </form>
            <Button2 className={css`background-color: ${color[0]}; color: ${color[4]};`} onClick={start}>Start</Button2>
        </div>
     );
}
 
export default NewBreak;