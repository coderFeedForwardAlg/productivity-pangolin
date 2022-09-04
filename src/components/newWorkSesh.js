
// photo licenc agreement: https://www.shutterstock.com/license
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import pangolinPic from './imgs/pangolinImg.png';
import StudyMusic from "./StudyMusic";

const NewWorkSesh = () => {
    const [time, setTime] = useState(25);
    
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
        history.push(`/timer/${time}`);
    }
        //TODO: fix stile of pic 
    return ( 
        <div className="new-work-sesh">
            <img src = {pangolinPic} style={{ width: '400px', float: "left"}}/>
            <form>
                <label id="new-work-lable"><h2>How Long Do You Want To Work</h2></label>
                <input placeholder="25" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                
            </form>
            <button className="startBut" onClick={start}>Start</button>
            {/* <StudyMusic /> */}
        </div>
     );
}
 
export default NewWorkSesh;