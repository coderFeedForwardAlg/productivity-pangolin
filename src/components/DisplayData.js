import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../firebase-config'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import BarChart from './BarChart';

const DisplayData = () => {
  const [workSession, setWorkSession] = useState([]);
  const userCollection = collection(db, "productivityData");
  const [user] = useAuthState(auth);
  const [userID, setUserID] = useState("");
  let durationArr = [];
  let labelsArr = [];
  const [workData, setWorkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "work data",
      data: durationArr,
      backgroundColor: ["purple"],
    }]
  });
  


  const getWork = async () => {
    try{
      const q = query( collection(db, "productivityData"), where("userID", "==", userID), orderBy("startWorkTime"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        durationArr.push(doc.data().duration);
        labelsArr.push(new Date(doc.data().startWorkTime.seconds*1000).getDate());
      });
      setWorkSession(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(durationArr);
      console.log(labelsArr);
    } catch( err ){
      console.log(err);
      console.log("userID");
      
    }
    
  };
  
  const fetchUserID = async () => {
    
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUserID(data.uid);
        getWork();
    } catch (err) {
        console.error(err);
        console.log("user?.uid"); 
    };
    
  }
  let fetchRes = <p></p>;
  if(!user){
    fetchRes = <p> Their was an error getting your data you may not be signd in or you internet conection may not be working </p>;
  }

  useEffect( ()=> {
    fetchUserID();
    setWorkData({
      labels: labelsArr,
      datasets: [{
        label: "work data",
        data: durationArr,
        backgroundColor: ["purple"],
      }]
    });
  },[userID, user]);

    return ( 
        <div className='display-data'>
          {fetchRes}
          <BarChart chartData={workData}/>
          {workSession.map( (duration) => {return <div> how long you worked: {duration.duration} </div>}) }
          { /*<p>This chart shows how long you have worked</p> */}
        </div>
     );
}
 
export default DisplayData;
