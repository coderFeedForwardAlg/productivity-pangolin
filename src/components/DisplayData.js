import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../firebase-config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import BarChart from './BarChart';

const DisplayData = () => {
  const [workSession, setWorkSession] = useState([]);
  const userCollection = collection(db, "productivityData");
  const [user] = useAuthState(auth);
  
  let durationArr = [];
  let labelsArr = [];
  useEffect(() => {
    const getWork = async () => {
      
      const q = query( collection(db, "productivityData"), where("userID", "==", "124aw1k2xhU47MSva2SxTb1IWTI3"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        durationArr.push(doc.data().duration);
        labelsArr.push(new Date(doc.data().startWorkTime.seconds*1000).getDay());
        
      });
      //console.log(durationArr);
      //console.log(labelsArr);
      setWorkSession(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      
    };
    getWork();

  }, []);
  
  const [workData, setWorkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "work data",
      data: durationArr,
      backgroundColor: ["green"],
    }]
  });

    return ( 
        <div className='display-data'>
          <BarChart chartData={workData}/>
          { workSession.map( (duration) => {return <div> how long you worked in each work session: {duration.duration} </div>}) }
        </div>
     );
}
 
export default DisplayData;