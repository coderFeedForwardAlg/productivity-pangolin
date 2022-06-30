import { Link } from 'react-router-dom';


const NavBar = () => {
    return ( 
        <nav className="navBar">
            <ul className='links'>
                <li> <Link to="/" className='brandLink'><h1>Productivity Pangolin</h1> </Link></li>
                <li><Link to="/work" className='brandLink'><h1>Work</h1> </Link> </li>
                {/*<li><Link to="/display" className='brandLink'><h1>Display</h1> </Link></li>  */}
            </ul>
        </nav>
    );
}
 
export default NavBar;