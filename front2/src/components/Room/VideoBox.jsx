import styled from "styled-components";
import {useEffect, useRef, useState} from "react";

const VideoBox = ({stream}) => {
    const ref = useRef();
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
export default VideoBox;