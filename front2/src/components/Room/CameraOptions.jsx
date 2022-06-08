import styled from "styled-components";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import {useEffect, useRef, useState} from "react";
import {CameraAudioStore} from "../../store/CameraAudioStore";

const CameraOptions = () => {

    const {Camera, Audio, currentCamera, currentAudio, setCuurentCamera, setCuurentAudio, addAudio, addCamera, resetCameraAudio, setAudio, setCamera} = CameraAudioStore();

    let cameraListArray = [];
    let audioListArray = [];

    const audioSelcectRef = useRef();

    const getCameras = async () => {
        try{
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === "videoinput");
            const audio = devices.filter(devices => devices.kind === "audioinput")


            cameras.forEach(camera => {
                cameraListArray.push([camera.deviceId, camera.label])
            })
            audio.forEach(audio => {
                audioListArray.push([audio.deviceId, audio.label])
            })

        }catch (e) {console.log(e)}
    }

    useEffect( () => {
        getCameras().then(()=> {
            setCamera(cameraListArray);
            setAudio(audioListArray);
        });
    }, [])

    useEffect(() => {
        console.log("audioSelcectRef", audioSelcectRef.current);
    }, [audioSelcectRef])

    const audioChange=(e)=>{
        setCuurentAudio(e.target.value)
    }

    return(
        <>
            <Name>
                소리 입력 선택 <br/>
            </Name>
            <SelectCamera onChange={audioChange}>
                {
                    Audio.map((item, key) => (
                        <OptionCamera key={key} value={item[0]}>{item[1]}</OptionCamera>
                    ))
                }
            </SelectCamera>


        </>
    );
}
const Name = styled.div`
  margin-top: 20px;
`
const SelectCamera = styled.select`
  border: 1px solid black;
`
const OptionCamera = styled.option`

`
export default CameraOptions;