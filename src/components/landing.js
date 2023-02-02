import { Button2 } from "./styles/Button";
import { css } from '@emotion/css';
import { useSelector } from "react-redux";

const Landing = () => {
    const color = useSelector((state) => state.color.value);
    return ( 
        <div className={css`
            padding: 30px;
            background: linear-gradient(to left,${color[1]}  0%,  ${color[2]} 100%);
            background-size: cover;
            height: 100vh;
            padding-top: 10%;
            color: white;
        `}>
            <h1 className={css`color: ${color[4]};`}>
                Welcome to Productivity Pangolin. 
            </h1> 
            <br/>
            <h3 className={css`color: ${color[4]};`}>
                This is a great place to make sure you are working hard and taking breaks! 
            </h3>
        </div>
     );
}
 
export default Landing;