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
    const [clientStat, setClintStat] = useState(client);

        // make sure this gets run
    const handleUserJoind = async (user, mediaType) =>{
        remoteUsers[user.uid] = user 
        await client.subscribe(user, mediaType)

        if (mediaType === 'video'){
            let player = document.getElementById(`user-container-${user.uid}`)
            if (player != null){
                player.remove()
            }

            player = `<div class="video-container" id="user-container-${user.uid}">
                            <div class="video-player" id="user-${user.uid}"></div> 
                    </div>`
            document.getElementById('other-stream').insertAdjacentHTML('beforeend', player)

            user.videoTrack.play(`user-${user.uid}`)
        }

        if (mediaType === 'audio'){
            user.audioTrack.play()
        }
        setCallNumDis(<div></div>);
    }
    
    

    // for authenticating users 
    const [user] = useAuthState(auth);
    const [notLogIn, setNotLogIn] = useState(<div></div>);
    const history = useHistory();
    

    let localTracks = [];
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    
    let remoteUsers = {};

    // for displaying call number 
    const [callNumDis, setCallNumDis] = useState(<div></div>);
    // for getting call numer 
    const [getNum, setGetNum] = useState(<div></div>);

    let UID = "this will be the UID";

    const [loading, setLoading] = useState( <div></div>); 


    client.on("user-published", handleUserJoind);
    

    const makeCall = () =>{
        // get call nubmer 
        // relying on no to random number being the same at the same time
        // should fix this when their are a lot of users 
        let callNum = Math.floor(Math.random() * 9999999999);

        // display number 
        setCallNumDis(<div>The call number is {callNum}. <br/> Send it to your accountability partner so they can join the call.</div>);

        // actuly make the call/ stream 
        // joinAndDisplayLocalStreem(callNum);
        readyToJoin(callNum);
    }
    const [makeBut, setMakeBut] = useState(
        <Button2  className={css`background-color: ${color[0]}; position: relative; z-index:3; `} onClick={makeCall}>
            Click to create call
       </Button2>
    );
    let callNum = null; 
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
                        callNum = (e.target.value);
                    }}/>

                 </form>
            </div>
        );

    }
    const [joinBut, setJoinBut] = useState(
        <Button2  className={css`background-color: ${color[0]};  `} onClick={joinCall}>
                Click to join call
        </Button2>
    );
    const handleCallNumSubmit = (event) =>{
        event.preventDefault();
        // joinAndDisplayLocalStreem(callNum);
        readyToJoin(callNum);
        
    }

    
    const joinAndDisplayLocalStreem = async (callNum) =>{
        setLoading( <div>Loading ... </div>);
        console.log("startin join and sisplay funciton ");
        client.on("user-published", handleUserJoind);

        client.on('user-left', handleUserLeft);


        // get token 
        let response;
        try {
            response = await Axios.get(`https://flask-api-kr3iijg4ca-uc.a.run.app/get_token/${callNum}`);
            console.log("axos responce ");
            console.log(response);
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
        setAudio(localTracks[0]);
        setVideo(localTracks[1]);
        console.log("***********local tracks *****************");
        console.log(localTracks[1]);

        
        let player = `<div class="video-container" id="user-container-${UID}">
        <div class="video-player" id="user-${UID}"></div>
  </div>`;
document.getElementById('your-stream').insertAdjacentHTML('beforeend', player)

        localTracks[1].play(`user-${UID}`)

        await client.publish([localTracks[0], localTracks[1]]);
        removeStartButs();
        setReadyToJoinCard(<div></div>);
        addMicAndLeave();
    }

    const [readyToJoinCard, setReadyToJoinCard] = useState(<div></div>);

    const readyToJoin = async (callNum) =>{
        // make a card with your vidio and a button that makes you join
        let localStream =  await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setReadyToJoinCard(<div className= {css`
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
    {/* show user their video befro joining stream  */}
        {/* <video id="videoForCard" className={css`
        bottom:0;
        display:grid;
        height: 200px;
        width: 200px;
        pointer-events: none;
    `} ></video> */}
        
        <h3> Are you ready to join the call?</h3>
        <Button2  className={css`background-color: ${color[0]};  `} onClick={ () => {joinAndDisplayLocalStreem(callNum)}}>
            Join Call
       </Button2>
    </div>);
    // document.getElementById('videoForCard').srcObject = localStream;
    }


        
    let handleUserLeft = async (user) => {
        delete remoteUsers[user.uid]
        document.getElementById(`user-container-${user.uid}`).remove()
        // document.getElementById('your-stream').innerHTML = '';

        console.log("user leaft function");
        // addStartButs();
        // killMicAndLeave();
    }
    client.on('user-left', handleUserLeft);


    let leaveAndRemoveLocalStream = async (localTracks) => {
        console.log("****************************");
        console.log("leave function done");
        await clientStat.leave();

        console.log(localTracks);

        document.getElementById('other-stream').innerHTML = '';
        document.getElementById('your-stream').innerHTML = '';
        
        addStartButs();
        killMicAndLeave();
        // for(let i = 0; localTracks.length > i; i++){
// this  does not work !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            audio.stop()
            video.stop()
            audio.close()
            video.close()
            // localTracks[i] = undefined;
        // }
        // make batter with react 
        
        
        

    }

    let toggleMic = async (localTracks) => {
        // console.log(localTracks[0]);
        if (audio.muted){
            await audio.setMuted(false)
            // e.target.innerText = 'Mic on'
            // e.target.style.backgroundColor = 'cadetblue'
        }else{
            await audio.setMuted(true)
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

    // remove the start call buttons 
    const removeStartButs = () =>{
        setJoinBut(<div></div>);
        setMakeBut(<div></div>);
        setGetNum(<div></div>);
        setLoading(<div></div>);
    }
    const addStartButs = () =>{
        setJoinBut(
        <Button2  className={css`background-color: ${color[0]}; `} onClick={joinCall}>
            Click to join call
        </Button2>);

        setMakeBut(
        <Button2  className={css`background-color: ${color[0]};`} onClick={makeCall}>
            Click to create call
       </Button2>);

    }

    const [videoButs , setVideoButs] = useState(<div></div>);
    const addMicAndLeave = (localTracks) =>{
        setVideoButs(
        <div>
            <Button2  className={css`background-color: ${color[0]}; position: relative; z-index:3; `} onClick={ () =>{leaveAndRemoveLocalStream(localTracks)}}>
                leave
            </Button2>
            {/* <Button2  className={css`background-color: ${color[0]};  `} onClick={ () => {toggleMic(localTracks)}}>
                    mic
            </Button2> */}
       </div>
        )
    }
    const killMicAndLeave = () =>{
        setVideoButs(<div></div>);
    }
    

    
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
       <Button2  className={css`background-color: ${color[0]}; position: relative; z-index:3; `} onClick={ () => {toggleMic(localTracks)}}>
                    mic
        </Button2>
       {videoButs}
       {makeBut}
       {joinBut}
       {readyToJoinCard}
       
       
       
       
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
        width: 100%;
        
        height: 100%;
        
        pointer-events: none;
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