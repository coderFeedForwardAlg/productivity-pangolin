import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import sound from './sound/mixkit-attention-bell-ding-586.wav';

const GoodWork = () => {
    const audio = new Audio(sound);
    const history = useHistory();
    const breakTime = ()=>{
        history.push('/break');
    }

    useEffect (() => {
        audio.play();
    });
    
    return ( 
        <div className="goodWork">
            <h1>Good Work</h1>
            {/*<form>
                <label id="new-work-lable"><h2>How focused were you out of 10?</h2></label>
                <input placeholder="10" 
                />
                
                
            </form> */}
            <button className="breakBut" onClick={breakTime}>
                Take a Break
            </button>
        </div>
     );
}
 
export default GoodWork;