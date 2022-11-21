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


  let labelsArr = []; // holds lables for all time charts (day of month)
  let todayLabels = []; // holds lables for today charts
    // holds data for charts 
  let durationArr = [];
  let focusArr = [];
  let focusAndworkArr = [];
  let justTodayFocusAndworkArr = [];
  let todayDurationArr = [];
  let todayFocusArr = [];
  
    // useState that sets vars to objects with all the data a chart needs  
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
      data: justTodayFocusAndworkArr,
      backgroundColor: ["purple"],
    }]
  });

  const [todayDurationData, setTodayDurationData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: durationArr,
      backgroundColor: ["purple"],
    }]
  });

  const [todayFocusData, setTodayFocusData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: todayFocusArr,
      backgroundColor: ["purple"],
    }]
  });
  

    //load data into arrays 
  const getWork = async () => {
    try{
      const q = query( collection(db, "productivityData"), where("userID", "==", userID), orderBy("startWorkTime"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          // for today charts 
        let today = new Date();
        console.log(today);
        console.log(doc.data().startWorkTime.toDate());
        if(doc.data().startWorkTime.toDate().getDate() == today.getDate() && doc.data().startWorkTime.toDate().getMonth() == today.getMonth() ){
          justTodayFocusAndworkArr.push(doc.data().duration * doc.data().productivity);
          todayFocusArr.push(doc.data().productivity);
          todayDurationArr.push(doc.data().duration);
          let ST = new Date(doc.data().startWorkTime.seconds*1000);
          todayLabels.push(ST.getHours() + ":"+  ST.getMinutes());

        }
          //for all time charts 
        durationArr.push(doc.data().duration);
        labelsArr.push(new Date(doc.data().startWorkTime.seconds*1000).getDate());
        focusArr.push(doc.data().productivity);
        focusAndworkArr.push(doc.data().duration * doc.data().productivity);
      });
      setWorkSession(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(durationArr);
      console.log(labelsArr);
    } catch( err ){
      console.log(err);
      console.log("userID");
    }
    
  };
  
    // fetch the data from fierbase and call getWork() from above 
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

    // on page load call fetchUserID and set work data 
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
        label: "focus times work",
        data: justTodayFocusAndworkArr,
        backgroundColor: ["purple"],
      }
    ]
    });

    setTodayDurationData({
      labels: todayLabels,
      datasets: [
      {
        label: "time working",
        data: todayDurationArr,
        backgroundColor: ["purple"],
      }
    ]
    });

    setTodayFocusData({
      labels: todayLabels,
      datasets: [
      {
        label: "focus (out of 10)",
        data: todayFocusArr,
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
          <h4>time working times focus, over time of day</h4>
          <BarChart chartData={justTodayFocusAndworkData} />
          <h4>time working, over time of day</h4>
          <BarChart chartData={todayDurationData} />
          <h4>focus, over time of day</h4>
          <BarChart chartData={todayFocusData} />
          <h4>time working times focus, over the day of the month</h4>
          <BarChart chartData={focusAndWorkData}  />
          <h4>time working, over the day of the month</h4>
          <BarChart chartData={workData} />
          <h4>focus, over the day of the month</h4>
          <BarChart chartData={focusData} />
          
          {/*workSession.map( (duration) => {return <div> how long you worked: {duration.duration} </div>}) */}
          { /*<p>This chart shows how long you have worked</p> */}
        </div>
     );
}
 
export default DisplayData;