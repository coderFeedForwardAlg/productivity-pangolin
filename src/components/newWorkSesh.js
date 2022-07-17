import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth} from '../firebase-config'
import { collection, addDoc, query,getDocs, where } from "firebase/firestore";

const NewWorkWesh = () => {
    const [time, setTime] = useState(25);
    
    const history = useHistory();
    const [user] = useAuthState(auth);

    const userCollection = collection(db, "productivityData");
    const creatWorkSesh = async ()=>{
        const d = new Date(); 

        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            await addDoc(userCollection, {
                duration: time, 
                productivity: null, 
                reward: null,
                startWorkTime: d,
                userID: data.uid
            });
            
        } catch (err) {
            console.error(err);
            alert("if you are not loged in than you data will not be saved");
        };
            
        
    }


    const start = ()=>{
        creatWorkSesh();
        history.push(`/timer/${time}`);
    }

    return ( 
        <div className="new-work-sesh">
            <form>
                <label id="new-work-lable"><h2>How Long Do You Want To Work</h2></label>
                <input placeholder="25" onChange={(e)=>{
                    setTime(e.target.value);
                }}/>
                {/*<error>{ errors.duration?.type === "required" && "please enter a value"}</error>
                <error>{errors.duration?.type === "pattern" && "please only enter numbers"}</error> */}
                
            </form>
            <button className="startBut" onClick={start}>Start</button>
        </div>
     );
}
 
export default NewWorkWesh;