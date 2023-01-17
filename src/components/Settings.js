import { css } from '@emotion/css';
import { useSelector } from "react-redux";

const Settings = () => {
    const color = useSelector((state) => state.color.value);
    return ( 
        <div className={css`
            background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
            text-align: center;
            font-size: 200px; 
            width: 100%;
            background-size: cover;
            height: 100vh;
        `}>
            <h3 className='timer-text'>happy Time!</h3>
            
        </div>
     );
}
 
export default Settings;