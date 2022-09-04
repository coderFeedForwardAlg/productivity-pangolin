import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {db, auth} from '../firebase-config'
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { useState } from "react";


const GoodWork = () => {
    const { time } = useParams();
    const history = useHistory();
    const [focus, setFocus] = useState(0);
  

    
    const [user] = useAuthState(auth);

    const userCollection = collection(db, "productivityData");
    
    const start = ()=>{
        createWorkSesh();
        history.push(`/new/break`);
    } 

        // for when user hits enter key insted of start button 
    document.onkeydown = function(e){
        e = e || window.event;
        let key = e.which || e.keyCode;
        if(key===13){
            start();
        }
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
            <button className="breakBut" onClick={start}>
                Take a Break
            </button>
        </div>
     );
}
 
export default GoodWork;