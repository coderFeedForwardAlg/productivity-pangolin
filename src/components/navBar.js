import { Link } from 'react-router-dom';


const NavBar = () => {
    return ( 
        <div className="navBar">
            <h2>Productivity Pangolin</h2>
            <div className="links">
                <Link to="\">Home</Link>
                <Link to="\work">Work</Link>
            </div>
        </div>
    );
}
 
export default NavBar;