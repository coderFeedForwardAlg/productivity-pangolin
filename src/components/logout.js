import { logout } from "../firebase-config";
import { useHistory } from "react-router-dom";
import { css } from '@emotion/css';
import { useSelector } from "react-redux";
import {Button2} from './styles/Button';

const Logout = () => {
    const color = useSelector((state) => state.color.value);
    const history = useHistory();
    const signout = () => {
        history.push("/work");
        logout();
    }
    return ( 
        <div className={css`
            position: fixed;
            left: 40%;
            top: 40%;
            
        `}>
            <Button2 className={css`background-color: ${color[0]};`} onClick={signout}>logout</Button2>
        </div>
     );
}
 
export default Logout;