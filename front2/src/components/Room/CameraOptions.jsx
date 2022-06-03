import styled from "styled-components";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import {useEffect, useRef, useState} from "react";
import {CameraAudioStore} from "../../store/CameraAudioStore";

const CameraOptions = () => {
    const{userStream, setUserStream} =MediaStreamStore();
    const [cameraList, setCameraList] = useState([]);

    const {Camera, Audio, currentCamera, currentAudio, setCuurentCamera, setCuurentAudio, addAudio, addCamera, resetCameraAudio, setAudio, setCamera} = CameraAudioStore();

    let cameraListArray = [];
    let audioListArray = [];

    const videoSelcectRef = useRef();
    const audioSelcectRef = useRef();

    const [audio1, setAudio1] = useState();

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

            console.log("audo", audio);
            console.log("dev", devices)

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


    const videoChange= (e) => {
        setCuurentCamera(e.target.value)
        console.log(currentCamera);
    }

    const audioChange=(e)=>{
        setCuurentAudio(e.target.value)
        console.log(e.target.value)
        console.log(e.target)
    }
    const testbuton = (e) => {
        console.log(currentCamera)
        console.log(currentAudio)
    }
    return(
        <>

            {/*<SelectCamera onChange={videoChange}>*/}
            {/*    {*/}
            {/*        Camera.map((item, key) => (*/}
            {/*            <OptionCamera key={key} value={item[0]}>{item[1]}</OptionCamera>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</SelectCamera>*/}
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