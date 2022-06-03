import styled from "styled-components";
import {useEffect, useRef, useState} from "react";

const VideoBox = ({stream}) => {
    const ref = useRef();
    const asdf= [1 ,2 ,3 ,4 ,5]
    useEffect(() => {
        if (ref.current) ref.current.srcObject = stream;
    }, [stream])

    return (
        <>
            <Video  ref={ref} muted={false} autoPlay ></Video>
        </>
    );
};

const Video = styled.video`
  width: 100%;
`
const Box = styled.div`
    display:grid; 
  grid-template-columns: ${props => props.len/5}vw 30vw 30vw;
`
export default VideoBox;