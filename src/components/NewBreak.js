import { useState } from "react";
import { useHistory } from "react-router-dom";

const NewBreak = () => {
    const [time, setTime] = useState(5);
    
    const history = useHistory();

    const start = ()=>{
        history.push(`/break/${time}`);
    }

    return ( 
        <div className="new-break">
            <form>
                <h2>How Long Do You Want to Take a Break</h2>
                <input placeholder="5" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                
            </form>
            <button className="startBut" onClick={start}>Start</button>
        </div>
     );
}
 
export default NewBreak;