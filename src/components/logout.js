import { logout } from "../firebase-config";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    const signout = () => {
        history.push("/work");
        logout();
    }
    return ( 
        <div className="logout">
            <button onClick={signout}>logout</button>
        </div>
     );
}
 
export default Logout;