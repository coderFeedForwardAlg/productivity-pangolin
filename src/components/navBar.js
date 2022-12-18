import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
    // for redux 
import { useDispatch, useSelector } from "react-redux";
import { setColor} from "../redux/color";

import { css } from '@emotion/css'
import styled from '@emotion/styled'
 
const NavBar = () => {
    const [user] = useAuthState(auth);
    let title = "login";
    let link = "/login";
    if(user){
        title = "logout";
        link = "/logout";
    }

        // for redux
    const color  = useSelector((state) => state.color.value);
    const dispatch = useDispatch();
     
    return (
        <nav className="nav-bar">
            <ul className={css`
                list-style-type: none;
                margin: 0;
                padding: 10px;
                overflow: hidden;
                background-color: ${color[3]};
                }
            `}>
                <li> <Link to="/landing" className='brandLink'><h1>Productivity Pangolin</h1> </Link></li>
                <li><Link to="/work" className='brandLink'><h1>Work</h1> </Link> </li>
                <li><Link to={link} className='brandLink'><h1>{title}</h1> </Link> </li>
                <li><Link to="/display" className='brandLink'><h1>Data</h1> </Link></li> 
                <li><Link  className='brandLink' ><h1 onClick={() => dispatch(setColor())}> switch theme </h1> </Link></li>
                
            </ul>
        </nav>
    );
}


export default NavBar;