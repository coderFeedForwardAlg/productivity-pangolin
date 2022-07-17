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
            <button className="breakBut" onClick={breakTime}>
                Take a Break
            </button>
        </div>
     );
}
 
export default GoodWork;