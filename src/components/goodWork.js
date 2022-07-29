import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import sound from './sound/mixkit-attention-bell-ding-586.wav';
import {db, auth} from '../firebase-config'
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { useState } from "react";


const GoodWork = () => {
    const { time } = useParams();
    const audio = new Audio(sound);
    const history = useHistory();
    const [focus, setFocus] = useState(0);

    const breakTime = ()=>{
        history.push('/break');
    }

    /*useEffect (() => {
        audio.play();
        
    });*/
  

    
    const [user] = useAuthState(auth);

    const userCollection = collection(db, "productivityData");
    
    const start = ()=>{
        createWorkSesh();
        //history.push(`/timer/${time}`);
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
            alert("if you are not loged in than you data will not be saved");
        };
            
        
    }

    
    return ( 
        <div className="goodWork">
            <h1>Good Work</h1>
            {<form>
                <label id="new-work-lable"><h2>How focused were you out of 10?</h2></label>
                <input placeholder="10" onChange={(e)=>{
                    setFocus(e.target.value);
                }}
                />
                <br />
                
            </form> }
            <button onClick={start}>enter</button>
            <button className="breakBut" onClick={breakTime}>
                Take a Break
            </button>
        </div>
     );
}
 
export default GoodWork;