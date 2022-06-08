import React, {useEffect, useRef, useState} from "react";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import styled from "styled-components";

const UserVideo = (props) => {
    const{userStream } =MediaStreamStore();
    const videoRef=useRef();

    if(userStream !== null){
        console.log("userStrema",userStream.getVideoTracks()    );
        videoRef.current.srcObject = userStream;

    }

    return(
        <>
            <Video ref={videoRef} autoPlay></Video>
        </>
    );
}
const Video = styled.video`
  width: 100px;
  height: 100px;
  
`
export default UserVideo;