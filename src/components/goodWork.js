import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {db, auth} from '../firebase-config'
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { useState } from "react";
import { css } from '@emotion/css'
import { useSelector } from "react-redux";
import {Button2} from './styles/Button';

const GoodWork = () => {
    const { time } = useParams();
    const history = useHistory();
    const [focus, setFocus] = useState(0);
    const color = useSelector((state) => state.color.value);

    
    const [user] = useAuthState(auth);

    const userCollection = collection(db, "productivityData");
    
    const start = ()=>{
        createWorkSesh();
        history.push(`/new/break`);
    } 
    const handleSubmit = (event) => {
        event.preventDefault();
        start();
    }
    
    const createWorkSesh = async ()=>{
        const d = new Date(); 

        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            await addDoc(userCollection, {
                duration: time, 
                productivity: focus, 
                reward: null,
                startWorkTime: d,
                userID: data.uid
            });
            
        } catch (err) {
            console.error(err);
        };
            
        
    }

    
    return ( 
        <div className={css`
            text-align: center;
            font-size: large;
            background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
            background-size: cover;
            height: 100vh;
        `}>
            <h1>Good Work</h1>
            {<form onSubmit={handleSubmit}>
                <label id="new-work-lable"><h2>How focused were you out of 10?</h2></label>
                <input placeholder="10" onChange={(e)=>{
                    setFocus(e.target.value);
                }}
                />
                <br />
                
            </form> }
            <Button2 className={css`
                background-color: ${color[0]}
            `} onClick={start}>
                Take a Break
            </Button2>
        </div>
     );
}
 
export default GoodWork;