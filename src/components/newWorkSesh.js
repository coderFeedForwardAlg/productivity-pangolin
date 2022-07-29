import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth} from '../firebase-config';
import { collection, addDoc, query,getDocs, where } from "firebase/firestore";

const NewWorkSesh = () => {
    const [time, setTime] = useState(25);
    
    const history = useHistory();



    const start = ()=>{
        history.push(`/timer/${time}`);
    }

    return ( 
        <div className="new-work-sesh">
            <form>
                <label id="new-work-lable"><h2>How Long Do You Want To Work</h2></label>
                <input placeholder="25" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                
            </form>
            <button className="startBut" onClick={start}>Start</button>
        </div>
     );
}
 
export default NewWorkSesh;