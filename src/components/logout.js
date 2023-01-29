import { logout } from "../firebase-config";
import { useHistory } from "react-router-dom";
import { css } from '@emotion/css';

const Logout = () => {
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
            <button2 className="logout-btn" onClick={signout}>logout</button2>
        </div>
     );
}
 
export default Logout;