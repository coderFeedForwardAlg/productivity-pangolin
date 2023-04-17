import { css } from '@emotion/css';
import { useSelector } from "react-redux";


import { useEffect, useState } from 'react';

import AgoraRTC from "agora-rtc-sdk-ng";


import {Button2} from './styles/Button';
import { AGORA_APP_ID, AGORA_TOKEN } from './env';






const VideoCall = () => {
    
    const color = useSelector((state) => state.color.value);

    const client = AgoraRTC.createClient({mode: "rtc", codec: "vp8"});

    let localTracks = [];
    let remoteUsers = {};

    let UID = "this will be the UID";

    const [loading, setLoading] = useState( <div></div>); 

    const joinAndDisplayLocalStreem = async () =>{
        setLoading( <div>Loading ... </div>);
        client.on("user-published", handleUserJoind);

        UID = await client.join(AGORA_APP_ID, "main", AGORA_TOKEN, null).then(
        console.log(UID)
        );

        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

        
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

    
    
    return ( 
        <div className={css`
        padding-top: 200px;
        color: ${color[4]};
        background: linear-gradient(to left, ${color[1]}  0%,  ${color[2]} 100%);
        height: 100vh;
        background-size: cover;
    `}>

       <br/>
       <h2>{loading}</h2>
       <Button2  className={css`background-color: ${color[0]};  `} onClick={joinAndDisplayLocalStreem}>
            click to join stream
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