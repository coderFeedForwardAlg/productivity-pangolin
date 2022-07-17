import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";


const NavBar = () => {
    const [user] = useAuthState(auth);
    let title = "login";
    let link = "/login";
    if(user){
        title = "logout";
        link = "/logout";
    }
    return ( 
        <nav className="navBar">
            <ul className='links'>
                <li> <Link to="/" className='brandLink'><h1>Productivity Pangolin</h1> </Link></li>
                <li><Link to="/work" className='brandLink'><h1>Work</h1> </Link> </li>
                <li><Link to={link} className='brandLink'><h1>{title}</h1> </Link> </li>
                <li><Link to="/display" className='brandLink'><h1>Data</h1> </Link></li> 
            </ul>
        </nav>
    );
}
 
export default NavBar;