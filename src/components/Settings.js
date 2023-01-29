import { css } from '@emotion/css';
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

    return ( 
        <div className={css`
            background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
            text-align: center;
            font-size: 200px; 
            width: 100%;
            background-size: cover;
            height: 100vh;
            @media (max-width: 420px) {
                font-size: 10px;
            }
        `}>
            <h3 className={css`
                font-size: 40px;
                @media (max-width: 420px){
                    font-size: 15px;
                    padding-top: 20%;
                }
            `}>You can change the color theme!</h3>
            <div className={css`
                
                display: grid;
                grid-template-columns: 45%;
                
            `}>
                
                <Button2 className={css`background:#663300`} onClick={updateColorGreen}>Green Forist</Button2>
                
                <Button2 className={css`background:blueviolet`} onClick={updateColorPurple}>Purple Future</Button2>
                
                <Button2 className={css`background:#990099`} onClick={updateColorPink}>Pink</Button2>

                <Button2 className={css`background:#000099`} onClick={updateColorBlue}>Ocean Blue</Button2>
            </div>
            
        </div>
     );
}
 
export default Settings;