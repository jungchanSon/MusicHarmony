import styled from "styled-components";
import {useRef} from "react";

const VideoBox = (props) => {
    const videoRef = useRef()

    if (props.stream)
        videoRef.current.srcObject = props.stream;

    return(
        <>
            <Vb ref={videoRef} autoPlay></Vb>
        </>
    );
}
const Vb = styled.video`
  width: 100px;
  height: 100px;
`
export default VideoBox;