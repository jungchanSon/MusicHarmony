import styled from "styled-components";
import {MediaStreamStore} from "../../store/MediaStreamStore";

const Buttons = () => {
    const{userStream} =MediaStreamStore();

    const handleCameraBtn = () => {
        userStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    const handleMuteBtn = () => {
        userStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    return(
        <>
            <Button onClick={handleCameraBtn}>카메라</Button>
            <Button onClick={handleMuteBtn}>소리</Button>
        </>
    );
}
const Button = styled.button`
  
`
export default Buttons;