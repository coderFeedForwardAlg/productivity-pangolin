import { css } from '@emotion/css';
import { useSelector } from "react-redux";
import pangolinPic from './imgs/pangolinImg.png';
import Draggable from 'react-draggable';


  

const Room = () => {
    const color = useSelector((state) => state.color.value);
   

    return ( 
        <div className={css`
            background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
            text-align: center;
            font-size: 200px; 
            width: 100%;
            background-size: cover;
            height: 100vh;
            color: ${color[4]};
        `}>
            
                <Draggable>
                    <img draggable="false" src = {pangolinPic} className={css`
                        width: 400px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin: -200px 0 0 -200px;
                        @media (max-width: 420px) {
                            width: 200px;
                        }
                        draggable={false}
                    `} />
                </Draggable>
            

        </div>
     );
}
 
export default Room;