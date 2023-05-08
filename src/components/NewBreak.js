import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button2 } from "./styles/Button";
import { css } from '@emotion/css';
import { Background } from "./styles/Background";
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
        <Background colorL={color[1]}  colorR={color[2]}>
            <form onSubmit={handleSubmit}>
                <h2 className={css`color: ${color[4]};`}>How Long Do You Want to Take a Break</h2>
                <input placeholder="5" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                
            </form>
            <Button2 className={css`background-color: ${color[0]}; color: ${color[4]};`} onClick={start}>Start</Button2>
        </Background>
     );
}
 
export default NewBreak;