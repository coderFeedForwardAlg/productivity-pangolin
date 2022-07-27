import { useState } from "react";
const SetTimes = () => {
    const [inputsDisplayed, setInputsDisplayed] = useState(false);
    const [inputs, setInputs] = useState(<div></div>);
    
    const displayInputs = () => {
        if(inputsDisplayed){
            setInputsDisplayed(false);
            setInputs(<div></div>);
        }else{
        setInputsDisplayed(true);
        setInputs ( 
            <div >
                work
                <input type="text" />
                <br />
                short break
                <input type="text" />
                <br />
                long break
                <input type="text" />
            </div> );
        }
    }
    return ( 
        <div className="set-times">
            <button onClick={displayInputs} className="set-time-but">
                set times
            </button>
            <div className="time-inputs">
                {inputs}
            </div>
            
            
        </div>
     );
}
 
export default SetTimes;