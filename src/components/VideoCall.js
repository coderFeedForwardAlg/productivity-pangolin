import { css } from '@emotion/css';
import { useSelector } from "react-redux";


import { useEffect, useState } from 'react';

import AgoraRTC from "agora-rtc-sdk-ng";


import {Button2} from './styles/Button';
import { AGORA_APP_ID, AGORA_TOKEN } from './env';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase-config';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const VideoCall = () => {
    
    const color = useSelector((state) => state.color.value);

    const client = AgoraRTC.createClient({mode: "rtc", codec: "vp8"});

    // for authenticating users 
    const [user] = useAuthState(auth);
    const [notLogIn, setNotLogIn] = useState(<div></div>);
    const history = useHistory();
    

    let localTracks = [];
    let remoteUsers = {};

    // for displaying call number 
    const [callNumDis, setCallNumDis] = useState(<div></div>);
    // for getting call numer 
    const [getNum, setGetNum] = useState(<div></div>);

    let UID = "this will be the UID";

    const [loading, setLoading] = useState( <div></div>); 

    const makeCall = () =>{
        // get call nubmer 
        // relying on no to random number being the same at the same time
        // should fix this when their are a lot of users 
        let callNum = Math.floor(Math.random() * 9999999999);

        // display number 
        setCallNumDis(<div>The call number is {callNum}. <br/> Send it you your accountability partner so they can join the call.</div>);

        // actuly make the call/ stream 
        joinAndDisplayLocalStreem(callNum);
    }
    const [callNum, setCallNum] = useState(null);
    const joinCall = () =>{
        setGetNum(
            <div className= {css`
                font-size: 20px;
                padding: 3%;
                background-color: ${color[1]};
                border: #000000;
                width: max-content;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: rotateX(0deg) translate(-50%, -50%);
                border-radius: 10%;
                border-style: solid;
            `}> 
                
                <form  className={css`color: ${color[4]};`} onSubmit={handleCallNumSubmit}>

                    <label id="new-work-lable"><h2 className={css`color: ${color[4]};`}>What is the call number?</h2></label>

                    <input placeholder="ex: 1948653696" onChange={(e)=>{
                        setCallNum(e.target.value);
                    }}/>

                 </form>
            </div>
        );
    }
    const handleCallNumSubmit = (event) =>{
        event.preventDefault();
        joinAndDisplayLocalStreem(callNum);
    }


    const joinAndDisplayLocalStreem = async (callNum) =>{
        setLoading( <div>Loading ... </div>);
        client.on("user-published", handleUserJoind);

        // client.on('user-left', handleUserLeft);


        // get token 
        let response;
        try {
            response = await Axios.get(`https://flask-api-kr3iijg4ca-uc.a.run.app/get_token/${callNum}`);
          } catch (error) {
            if (error.response) {
              console.log(error.reponse.status);
            } else {
              console.log(error.message);
            }
          }
         let token = response.data['token: '];
         console.log(response);

         // used `` to make sure its a string 
        UID = await client.join(AGORA_APP_ID, `${callNum}`, token, null); 

        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        console.log("****************************");
        console.log(localTracks[0]);

        
        let player = `<div class="video-container" id="user-container-${UID}">
        <div class="video-player" id="user-${UID}"></div>
  </div>`;
document.getElementById('your-stream').insertAdjacentHTML('beforeend', player)

        localTracks[1].play(`user-${UID}`)
        

        await client.publish([localTracks[0], localTracks[1]]).then(setLoading(<div></div>));

    }


    const handleUserJoind = async (user, mediaType) =>{
        remoteUsers[user.uid] = user;
        await client.subscribe(user, mediaType);
        let player = document.getElementById(`user-container-${user.uid}`)
        if(player != null){
            player.remove();
        }
         player = `<div class="video-container" id="user-container-${user.uid}">
                <div class="video-player" id="user-${user.uid}"></div>
        </div>`;
        document.getElementById('other-stream').insertAdjacentHTML('beforeend', player);
        user.videoTrack.play(`user-${user.uid}`);
        // if(mediaType === "audio"){ // this led to their not beeing audio 
            user.audioTrack.play(); // need user id?? 
        // }
    }

        
    let handleUserLeft = async (user) => {
        delete remoteUsers[user.uid]
        document.getElementById(`user-container-${user.uid}`).remove()
    }


    let leaveAndRemoveLocalStream = async () => {
        console.log("****************************");
        console.log("leave function done");
        console.log(localTracks);

        for(let i = 0; localTracks.length > i; i++){
            localTracks[i].stop()
            localTracks[i].close()
            // localTracks[i] = undefined;
        }

        
    
        await client.leave();

    }

    let toggleMic = async () => {
        // console.log(localTracks[0]);
        if (localTracks[0].muted){
            await localTracks[0].setMuted(false)
            // e.target.innerText = 'Mic on'
            // e.target.style.backgroundColor = 'cadetblue'
        }else{
            await localTracks[0].setMuted(true)
        //     e.target.innerText = 'Mic off'
        //     e.target.style.backgroundColor = '#EE4B2B'
        }
    }

    // for loging in 
    const logIn = () =>{
        history.push(`/login`);
    }

    useEffect( () =>{
        if(user){
            setNotLogIn(<div></div>)
        }else{
            setNotLogIn(
                <div className= {css`
                    font-size: 20px;
                    padding: 3%;
                    background-color: ${color[1]};
                    border: #000000;
                    width: max-content;
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    transform: rotateX(0deg) translate(-50%, -50%);
                    border-radius: 10%;
                    border-style: solid;
                `}> 
                    You need to log in or sign up for video calling to work.
                    <br />  
                    <Button2 className={css`background-color: ${color[0]}; `} onClick={logIn}> Log In</Button2>
                </div>
            );
    
        }
        
    }, []);
    

    
    return ( 
        <div className={css`
        padding-top: 200px;
        color: ${color[4]};
        background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
        height: 100vh;
        background-size: cover;
    `}>

{/* add login requierment back in later  */}
       {/* {notLogIn}  */}

       {getNum}
       {loading}
       {callNumDis}
       <Button2  className={css`background-color: ${color[0]};  `} onClick={leaveAndRemoveLocalStream}>
            leave
       </Button2>
       <Button2  className={css`background-color: ${color[0]};  `} onClick={toggleMic}>
            mic
       </Button2>
       <Button2  className={css`background-color: ${color[0]};  `} onClick={makeCall}>
            click to creat call
       </Button2>
       <Button2  className={css`background-color: ${color[0]};  `} onClick={joinCall}>
            click to join call
       </Button2>
       
       
       
       
       <br/>
       <br/>
       <br/>
       {/* <button id="join-btn">Join Stream</button> */}

<div id="stream-wrapper" >
    <div id="other-stream" className={css`
        position: fixed; 
        bottom:0;
        right:0;
        display:grid;
        
        height: 800px;
        width: 800px;
    `} ></div>
    <div id="your-stream" className={css`
        position:fixed;
        bottom:0;
        display:grid;
        
        height: 200px;
        width: 200px;
    `} ></div>
    {/* <div id="stream-controls">
        <button id="leave-btn">Leave Stream</button>
        <button id="mic-btn">Mic On</button>
        <button id="camera-btn">Camera on</button>
    </div> */}
</div>
      </div>
     );
}
 
export default VideoCall;