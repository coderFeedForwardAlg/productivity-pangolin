import { css } from '@emotion/css';
import { Background } from './styles/Background';
import { useSelector } from "react-redux";
import pangolinPic from './imgs/pangolinImg.png';
import Draggable from 'react-draggable';
import { useState, useEffect} from 'react';
import { Button2 } from "./styles/Button";

// for firebase 
// import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../firebase-config'
import { collection, query, getDocs } from 'firebase/firestore'
// import { realTimeDatabase } from '../firebase-config';
import firebase from "firebase/compat/app" ;
import {firestoreDB} from '../firebase-config';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { div } from '@tensorflow/tfjs';




const RTC = () => {
    
    const color = useSelector((state) => state.color.value);

    const [buttons, setButtons] = useState(<div> </div>);
    const [callID, setCallID] = useState(<div> </div>);
    const [audio, setAudio] = useState(true);

    // const [id, setId] = useState("");
    let id = "";

    const firestore = firestoreDB;
    const servers = {
        iceServers: [
          {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
          },
        ],
        iceCandidatePoolSize: 10,
      };
      
      const pc = new RTCPeerConnection(servers);
      let localStream = null;

    let remoteStream = null;
      
    const [activeBut, setActiveBut] = useState(true);
    let webcamVideo;
    let callInput;
    let callButton;
    let answerButton;

      useEffect( ()=>{
       webcamVideo = document.getElementById('local');
        callInput = document.getElementById('callInput');
        console.log(callInput);
        callButton = document.getElementById('callButton');
        answerButton = document.getElementById('answerButton');
      },[]);


      let startWebCam = async () => {
        localStream =  await navigator.mediaDevices.getUserMedia({ video: true, audio: audio });
    
        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });
    
        // Show stream in HTML video
        webcamVideo.srcObject = localStream;
        console.log("local strem : " + localStream)
        console.log(localStream);
        // callButton.disabled = false;
        // answerButton.disabled = false;
        // setActiveBut(false);
        // webcamButton.disabled = true;
        setButtons(<div>
            <Button2 className={css`
                    background-color: ${color[0]}; 
                    color: ${color[4]};
                `} onClick={makeCall} id='callButton' >make a call </Button2>

                <Button2 className={css`
                    background-color: ${color[0]}; 
                    color: ${color[4]};
                `} onClick={answerCall} id = 'answerButton'>join call </Button2>
   
                <input id="callInput" onChange={(e)=>{
                        // setId(e.target.value.toString());
                        id = e.target.value;
                        console.log(id);
                    }} />
        </div>);
        setCallID(<div>To join a call, past to call id into the input box and hit join call. <br/> To start a call hit make call.</div>);
    }


    remoteStream = new MediaStream;

// Pull tracks from remote stream, add to video stream
useEffect( () => {
const remoteVideo = document.getElementById("remote");
pc.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
    });
}
remoteVideo.srcObject = remoteStream;
},[]);





let makeCall = async () => {
    console.log("make call ran");
    // Reference Firestore collections for signaling
    
    
    const callDoc = firestore.collection('calls').doc();
    
    // const q = query(collection(db, "calls"));
    // const callDoc = await getDocs(q);
    // console.log(callDoc);
    // const callDoc = collection(firestore, "calls")


      const offerCandidates = callDoc.collection('offerCandidates');
    //   const q2 = query(collection(db, "offerCandidates"));
    //   const offerCandidates = await getDocs(q2);
      console.log(offerCandidates);

      const answerCandidates = callDoc.collection('answerCandidates');
    //   const q3 = query(collection(db, "offerCandidates"));
    //   const answerCandidates = await getDocs(q3);
      console.log(offerCandidates);

      
    // how did I salve this last teme ??????
      const id = callDoc.id;
      setCallID(<div>The call id is: {id}. Send it to your study buddy!</div>)
    // console.log(callInput);
    
      // Get candidates for caller, save to db
      pc.onicecandidate = event => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };
    
      // Create offer
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
    
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
    
      await callDoc.set({ offer });
    
      // Listen for remote answer
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });
    
      // Listen for remote ICE candidates
      answerCandidates.onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
            setButtons(<div></div>);
            setCallID(<div></div>);
          }
        });
      });
    }


    // answer 
    let answerCall = async () => {
        const callId = id;
        console.log("id is "+ id);
        const callDoc = firestore.collection('calls').doc(callId);

        
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
      
        pc.onicecandidate = event => {
          event.candidate && answerCandidates.add(event.candidate.toJSON());
        };
      
        // Fetch data, then set the offer & answer
      
        const callData = (await callDoc.get()).data();

        // dont use === 
        if(callData == null){
          console.log("callData is null, network error?");
        }
        
      
        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
      
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);
      
        const answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        };
      
        await callDoc.update({ answer });
      
        // Listen to offer candidates
      
        offerCandidates.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            console.log(change)
            if (change.type === 'added') {
              let data = change.doc.data();
              pc.addIceCandidate(new RTCIceCandidate(data));
              setButtons(<div></div>);
              setCallID(<div></div>);
            }
          });
        });
        
      };


      window.onbeforeunload = function(e) {
        alert("The timer will be reset if you reload the page");
        return "Do you want to exit this page? \n your timer will be reset";
      };

    return ( 
        <Background colorL={color[1]}  colorR={color[2]}>
            
                {/* <Draggable>
                    <img draggable="false" src = {pangolinPic} className={css`
                        width: 400px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin: -200px 0 0 -200px;
                        @media (max-width: 420px) {
                            width: 200px;
                        }
                        draggable={false}
                    `} />
                </Draggable> */}

                <Button2 className={css`
                    background-color: ${color[0]}; 
                    color: ${color[4]};
                `}   onClick={startWebCam}>start web cam </Button2>
                <br/>
                
                {/* <Button2 className={css`
                    background-color: ${color[0]}; 
                    color: ${color[4]};
                `} onClick={makeCall} id='callButton' >make a call </Button2>
                <br/>
                <Button2 className={css`
                    background-color: ${color[0]}; 
                    color: ${color[4]};
                `} onClick={answerCall} id = 'answerButton'>answer call </Button2>
                <br/>
                <input id="callInput" /> */}
                
                <br/>
                <video id="local" autoPlay playsInline className={css`
                    position: fixed;
                    width: 200px;
                    hight: 200px:
                    right: 0; 
                    bottom: 0;
                    
                `} muted></video>

                <video id="remote" autoPlay playsInline className={css`
                    position: fixed;
                    padding: 100px;
                    right: 0; 
                `}></video>
                {callID}
                {buttons}

        </Background>
     );
}
 
export default RTC;