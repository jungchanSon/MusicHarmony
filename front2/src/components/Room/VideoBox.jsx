import styled from "styled-components";
import {useEffect, useRef, useState} from "react";

const VideoBox = ({stream}) => {
    const ref = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (ref.current) ref.current.srcObject = stream;
    });

    return (
        <>
            <video ref={ref} muted={isMuted} autoPlay></video>
        </>
    );
};

export default VideoBox;