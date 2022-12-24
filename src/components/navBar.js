import { Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from '../firebase-config'; // auth redundent 

    // for redux 
import { useDispatch, useSelector } from "react-redux";
import { setColorPurple, setColorGreen} from "../redux/color";

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
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        // set the color based on firebase
    const getColor = async () => {
    const querySnapshot = await getDocs(q);
    

    querySnapshot.forEach((doc) => {
        let a = doc.data();
        console.log(a.theme);
        switch(a.theme){
            case "purple":
                dispatch(setColorGreen());
                //console.log("set to purpule")
            case "green":
                dispatch(setColorGreen());
                //console.log("set to green");
        }
    });  
    
    }
    getColor();
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
                <li><Link  className='brandLink' ><h1 onClick={() => dispatch(setColorPurple())}> purple theme </h1> </Link></li>
                <li><Link  className='brandLink' ><h1 onClick={() => dispatch(setColorGreen())}> green theme</h1> </Link></li>
                
            </ul>
        </nav>
    );
}


export default NavBar;