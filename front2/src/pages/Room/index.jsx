import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Sockjs from "sockjs-client";
import Stomp from "stompjs";
import {UserStore} from "../../store/UserStore";
import UserVideo from "../../components/Room/UserVideo";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import Buttons from "../../components/Room/Buttons";
import CameraOptions from "../../components/Room/CameraOptions";
const Room = () => {
    const{userStream, setUserStream} =MediaStreamStore();


    const videoStreamRef = useRef();
    const [stream, setStream] = useState()
    const {camera, mute, switchCamera, switchMute} = UserStore();
    const optionRef = useRef();
    let myStream;

    var CameraOptionArray = [];
    var roomID = null;
    var userName = null;
    var [cameraOption, setCameraOption] = useState();

    if (typeof window !== 'undefined') {
        roomID=localStorage.getItem("roomID");
        userName=localStorage.getItem("userName");
    }

    const connnect =  (stompClient) => {
        console.log(roomID);

        var socket = new Sockjs('http://localhost:8080/music-harmony');
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            frame => {
                console.log('Connecteddddddddd: ' + frame);
                stompClient.subscribe('/sub/musicRoom/'+roomID, message => {
                    console.log("메시지 답음 ", message.body);
                });
                stompClient.send('/pub/musicRoom',{}, JSON.stringify({roomID:roomID, userName:userName, message:"NewUser"}));
            },
            error => {
                console.log('error', error);
            }
        );
    }

    const getCameras = async () => {
        try{
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log(devices)
            const cameras = devices.filter(device => device.kind === "videoinput");
            console.log("camera >>>" , cameras[0].deviceId)
            cameras.forEach(camera => {
                // setCameraOption([...cameraOption, [camera.deviceId, camera.label]])
                console.log("useuse");
                CameraOptionArray.push([camera.deviceId, camera.label])

                console.log("camera >>>>>>", camera.deviceId)
            })

        }catch (e) {console.log(e)}
    }
    const getMedia = async (deviceId) =>  {
        const initialConstrains = {
            audio : true,
            video : {facingMode: "user"}
        };
        const cameraConstraints = {
            audio: true,
            video: {deviceId: {exact: deviceId}}
        };
        try{
            myStream = await navigator.mediaDevices.getUserMedia(
                deviceId ? cameraConstraints : initialConstrains
            );
            setUserStream(myStream);
            if (!deviceId) {
                await getCameras();
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() =>{
        getMedia();
    }, [])


    // const handleCameraBtn = () => {
    //     myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    // }
    //
    // const handleMuteBtn = () => {
    //     console.log("asdf")
    //     myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    //     console.log(CameraOptionArray);
    // }

    useEffect(() => {
        console.log(myStream)
    }, [])

    connnect();


    return (
        <div>
            <h1>Room</h1>

            <UserVideo autoPlay></UserVideo>

            {/*<select name="" id="cameras">*/}
            {/*    <option ref={optionRef}></option>*/}
            {/*    {*/}
            {/*        cameraOption.map( (item, key) => (*/}
            {/*            <option key={key} value={item[0]}>{item[1]}</option>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</select>*/}
            {/*<div>{cameraOption[0]}</div>*/}

            <CameraOptions></CameraOptions>

            <div>
                <Buttons></Buttons>
            </div>
        </div>
    );
};

const Video = styled.video`
  width: 100px;
  height: 100px;
`

export default Room;