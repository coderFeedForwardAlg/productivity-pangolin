import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../firebase-config'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import BarChart from './BarChart';
import { useSelector } from "react-redux";
import { css } from '@emotion/css';
import Axios from 'axios';





const DisplayData = () => {
  const [workSession, setWorkSession] = useState([]);
  const userCollection = collection(db, "productivityData");
  const [user] = useAuthState(auth);
  const [userID, setUserID] = useState("");
  const color = useSelector((state) => state.color.value);
  


  let labelsArr = []; // holds lables for all time charts (day of month)
  let todayLabels = []; // holds lables for today charts
    // holds data for charts 
  let durationArr = [];
  let focusArr = [];
  let focusAndworkArr = [];
  let justTodayFocusAndworkArr = [];
  let todayDurationArr = [];
  let todayFocusArr = [];
  let dayOfWeek = [];
  let avrDir = [];
  let day = [];
    // useState that sets vars to objects with all the data a chart needs  
  const [workData, setWorkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "work data",
      data: durationArr,
      backgroundColor: color[1],
    }]
  });
  const [focusData, setfocusData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: durationArr,
      backgroundColor: color[1],
    }]
  });
  const [focusAndWorkData, setfocusAndWorkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: durationArr,
      backgroundColor: color[1],
    }]
  });

  const [justTodayFocusAndworkData, setjustTodayFocusAndworkData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: justTodayFocusAndworkArr,
      backgroundColor: color[1],
    }]
  });

  const [todayDurationData, setTodayDurationData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: durationArr,
      backgroundColor: color[1],
    }]
  });

  const [todayFocusData, setTodayFocusData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: todayFocusArr,
      backgroundColor: color[1],
    }]
  });

  const [avrDirData, setAvrDirData] = useState({
    labels: labelsArr,
    datasets: [{
      label: "focus data",
      data: todayFocusArr,
      backgroundColor: color[1],
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
          // unnesisary read from firebase ? 
          dayOfWeek.push(new Date(doc.data().startWorkTime.seconds*1000).getDay());
        focusArr.push(doc.data().productivity);
        focusAndworkArr.push(doc.data().duration * doc.data().productivity);
        let spesificDay = doc.data().startWorkTime.toDate();
        day.push(spesificDay.getDate() +  spesificDay.getMonth() * 31 + spesificDay.getYear() * 365);

      });
      setWorkSession(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(durationArr);
      console.log(labelsArr);
    } catch( err ){
      console.log(err);
      console.log("userID");
    }
    console.log("the day arr is ");
    console.log(day);
    avrDir = await postData();
    console.log("avr dir" );
    console.log(avrDir.data[0]);
    // postToTree();

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
        backgroundColor: color[1],
      }
    ]
    });

    setfocusData({
      labels: labelsArr,
      datasets: [
      {
        label: "focus from 1 to 10",
        data: focusArr,
        backgroundColor: color[1],
      }
    ]
    });

    setfocusAndWorkData({
      labels: labelsArr,
      datasets: [
      {
        label: "focus times work",
        data: focusAndworkArr,
        backgroundColor: color[1],
      }
    ]
    });


    setjustTodayFocusAndworkData({
      labels: todayLabels,
      datasets: [
      {
        label: "focus times work",
        data: justTodayFocusAndworkArr,
        backgroundColor: color[1],
      }
    ]
    });

    setTodayDurationData({
      labels: todayLabels,
      datasets: [
      {
        label: "time working",
        data: todayDurationArr,
        backgroundColor: color[1],
      }
    ]
    });

    setTodayFocusData({
      labels: todayLabels,
      datasets: [
      {
        label: "focus (out of 10)",
        data: todayFocusArr,
        backgroundColor: color[1],
      }
    ]
    });

    


  },[userID, user]);



  
  const postData =  async () => {
    const json = {
      "durationArr" : durationArr,
      "dayOfWeek": dayOfWeek,
      "day": day

    }
  
    try {
      const response = await Axios.post("https://flask-api-kr3iijg4ca-uc.a.run.app/json_example", json);
      console.log("responc for day of week stats: ");
      console.log(response);
      setAvrDirData({
        labels: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saterday"],
        datasets: [
        {
          label: "average deration",
          data: response.data,
          backgroundColor: color[1],
        }
      ]
      });
      return response
    } catch (error) {
      if (error.response) {
        console.log(error.reponse.status);
      } else {
        console.log(error.message);
      }
    }
    
  }
  
  const postToTree =  async () => {
    const json = {
      "durationArr" : durationArr,
      "day": dayOfWeek,
      "focusAndWork": focusAndworkArr,
      "time": day
    }
  
    try {
      const response = await Axios.post("https://flask-api-kr3iijg4ca-uc.a.run.app/DecisionTree", json);
      console.log("responc: ");
      console.log(response);
      return response
    } catch (error) {
      if (error.response) {
        console.log(error.reponse.status);
      } else {
        console.log(error.message);
      }
    }
    
  }

  



    return ( 
        <div className={css`
          padding-top: 140px;
          padding-left: 10px;
          @midia(min-width: 720){
            padding-top: 0px; // TODO: not working 
          }
        `}>
          {fetchRes}
          <h4>time working times focus, over time of day</h4>
          <BarChart chartData={justTodayFocusAndworkData} />
          <h4>time working, over time of day</h4>
          <BarChart chartData={todayDurationData} />
          <h4>focus, over time of day</h4>
          <BarChart chartData={todayFocusData} />
          <h4>average total amount of work for each day of the week </h4>
          <BarChart chartData={avrDirData} />
          {/* <h4>time working times focus, over the day of the month</h4>
          <BarChart chartData={focusAndWorkData}  />
          <h4>time working, over the day of the month</h4>
          <BarChart chartData={workData} />
          <h4>focus, over the day of the month</h4>
          <BarChart chartData={focusData} /> */}
          

          {/*workSession.map( (duration) => {return <div> how long you worked: {duration.duration} </div>}) */}
          { /*<p>This chart shows how long you have worked</p> */}
        </div>
     );
}
 
export default DisplayData;