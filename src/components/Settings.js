import { css } from '@emotion/css';
import { Background } from './styles/Background';
import { Button2 } from "./styles/Button";
import { useDispatch, useSelector } from "react-redux";
import { setColorPurple, setColorGreen, setColorPink, setColorBlue} from "../redux/color";

const Settings = () => {
            // for redux
    const color  = useSelector((state) => state.color.value);
    const dispatch = useDispatch();
    
    

    const updateColorPurple = async () => { 
        localStorage.setItem("color", "purple");   
        console.log(localStorage.getItem("color"));
        dispatch(setColorPurple());
    }
    const updateColorGreen = async () => {
        localStorage.setItem("color", "green");
        console.log(localStorage.getItem("color"));
        dispatch(setColorGreen());    
    }
    const updateColorPink = async () => {
        localStorage.setItem("color", "pink");
        console.log(localStorage.getItem("color"));
        dispatch(setColorPink());    
    }
    const updateColorBlue = async () => {
        localStorage.setItem("color", "blue");
        console.log(localStorage.getItem("color"));
        dispatch(setColorBlue());    
    }

    // TODO: put in redux 
    // const updateBreakChecklist = async () => {
    //     localStorage.setItem("checklis", true);
    // }

    return ( 
        <Background colorL={color[1]}  colorR={color[2]}>
            <h3 className={css`
                font-size: 40px;
                padding-top: 10%;
                color: ${color[4]};
                @media (max-width: 420px){
                    font-size: 15px;
                    padding-top: 20%;
                }
            `}>Settings</h3>
            <div className={css`
                display: grid;
                grid-template-columns: 25% 25% 25% 25%;

                @media (max-width: 720px){
                    grid-template-columns: 100%;
                }
                
            `}>
                <div className={css`
                display:flex;
                flex-direction: column;
                `}>
                <h1>color themes</h1>
                <Button2 className={css`background:#663300`} onClick={updateColorGreen}>Green Forest</Button2>
                
                <Button2 className={css`background:blueviolet`} onClick={updateColorPurple}>Purple Future</Button2>
                
                <Button2 className={css`background:#990099`} onClick={updateColorPink}>Pink</Button2>

                <Button2 className={css`background:#000099`} onClick={updateColorBlue}>Ocean Blue</Button2>
                </div>
                
                <div></div>

                {/* <div className={css`
                display:flex;
                flex-direction: column;`}>
                <h1>Break Checklist</h1>
                    <Button2 className={css`background:#663300`} onClick={updateColorGreen}>Green Forest</Button2>
                    
                </div> */}
            </div>

            

            
                

                
            
        </Background>
     );
}
 
export default Settings;