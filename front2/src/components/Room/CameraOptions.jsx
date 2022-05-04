import styled from "styled-components";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import {useEffect, useState} from "react";

const CameraOptions = () => {
    const{userStream, setUserStream} =MediaStreamStore();
    const [cameraList, setCameraList] = useState([]);
    let cameraListArray = [];
    const getCameras = async () => {
        try{
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === "videoinput");
            cameras.forEach(camera => {
                cameraListArray.push([camera.deviceId, camera.label])
            })

        }catch (e) {console.log(e)}
    }

    useEffect( () => {
        getCameras().then(setCameraList(cameraListArray));
    }, [])
    return(
        <>
            <SelectCamera>
                {
                    cameraList.map((item, key) => (
                        <OptionCamera key={key} value={item[0]}>{item[1]}</OptionCamera>
                    ))
                }
                <OptionCamera></OptionCamera>
            </SelectCamera>
        </>
    );
}
const SelectCamera = styled.select`

`
const OptionCamera = styled.option`

`
export default CameraOptions;