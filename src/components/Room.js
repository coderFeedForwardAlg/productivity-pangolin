import { css } from '@emotion/css';
import { Background } from './styles/Background';
import { useSelector } from 'react-redux';
import pangolinPic from './imgs/pangolinImg.png';
import Draggable from 'react-draggable';





const Room = () => {
   
    const color = useSelector((state) => state.color.value);

     
    return ( 
        <Background colorL={color[1]}  colorR={color[2]}>
            
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

                

        </Background>
     );
}
 
export default Room;