import { css } from '@emotion/css';
import { useSelector } from "react-redux";
import pangolinPic from './imgs/pangolinImg.png';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';


  

const Room = () => {
    const color = useSelector((state) => state.color.value);
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
   

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
                        top: ${yPos}px;
                        left: ${xPos}px;
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