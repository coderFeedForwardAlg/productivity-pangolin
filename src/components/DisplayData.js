import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../firebase-config'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import BarChart from './BarChart';
import * as tf from '@tensorflow/tfjs';


const DisplayData = () => {
  const [workSession, setWorkSession] = useState([]);
  const userCollection = collection(db, "productivityData");
  const [user] = useAuthState(auth);
  const [userID, setUserID] = useState("");


  let labelsArr = [];
  let durationArr = [];
  let focusArr = [];
  let focusAndworkArr = [];
  let justTodayFocusAndworkArr = [];
  let todayLabels = [];

  const [workData, setWorkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "work data",
      data: durationArr,
      backgroundColor: ["purple"],
    }]
  });
  const [focusData, setfocusData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: durationArr,
      backgroundColor: ["purple"],
    }]
  });
  const [focusAndWorkData, setfocusAndWorkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: durationArr,
      backgroundColor: ["purple"],
    }]
  });

  const [justTodayFocusAndworkData, setjustTodayFocusAndworkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: durationArr,
      backgroundColor: ["purple"],
    }]
  });
  


  const getWork = async () => {
    try{
      const q = query( collection(db, "productivityData"), where("userID", "==", userID), orderBy("startWorkTime"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let today = new Date();
        
        if((doc.data().startWorkTime.toDate().toString().substring(0,8) == today.toString().substring(0,8))){
          justTodayFocusAndworkArr.push(durationArr[durationArr.length - 1] * focusArr[focusArr.length - 1]);
          let ST = new Date(doc.data().startWorkTime.seconds*1000);
          todayLabels.push(ST.getHours() + ":"+  ST.getMinutes());
        }
        
        durationArr.push(doc.data().duration);
        labelsArr.push(new Date(doc.data().startWorkTime.seconds*1000).getDate());
        focusArr.push(doc.data().productivity);
        focusAndworkArr.push(durationArr[durationArr.length - 1] * focusArr[focusArr.length - 1]);
        
        
        
        
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
      datasets: [
      {
        label: "time working",
        data: durationArr,
        backgroundColor: ["purple"],
      }
    ]
    });

    setfocusData({
      labels: labelsArr,
      datasets: [
      {
        label: "focus from 1 to 10",
        data: focusArr,
        backgroundColor: ["purple"],
      }
    ]
    });

    setfocusAndWorkData({
      labels: labelsArr,
      datasets: [
      {
        label: "focus times work",
        data: focusAndworkArr,
        backgroundColor: ["purple"],
      }
    ]
    });


    setjustTodayFocusAndworkData({
      labels: todayLabels,
      datasets: [
      {
        label: "todays focus times work",
        data: justTodayFocusAndworkArr,
        backgroundColor: ["purple"],
      }
    ]
    });

  },[userID, user]);

// ML modle 
const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));
function predict(x) {
  // y = a * x ^ 3 + b * x ^ 2 + c * x + d
  return tf.tidy(() => {
    return a.mul(x.pow(tf.scalar(3))) // a * x^3
      .add(b.mul(x.square())) // + b * x ^ 2
      .add(c.mul(x)) // + c * x
      .add(d); // + d
  });
}


    return ( 
        <div className='display-data'>
          {fetchRes}
          <BarChart chartData={justTodayFocusAndworkData} />
          <BarChart chartData={focusAndWorkData}  />
          <BarChart chartData={workData} />
          <BarChart chartData={focusData} />
          
          {/*workSession.map( (duration) => {return <div> how long you worked: {duration.duration} </div>}) */}
          { /*<p>This chart shows how long you have worked</p> */}
        </div>
     );
}
 
export default DisplayData;