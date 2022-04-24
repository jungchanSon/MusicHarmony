import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Sockjs from "sockjs-client";
import Stomp from "stompjs";
const Room = () => {
    var roomID = null;
    var userName = null;
    var [cameraOption, setCameraOption] = useState([]);

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
                setCameraOption([[camera.deviceId, camera.label]])
                console.log("camera >>>>>>", camera.deviceId)
            })
        }catch (e) {console.log(e)}
    }



    useEffect(() => {
        getCameras();
    }, [])
    connnect();



    return (
        <div>
            <h1>Room</h1>
            <video></video>
            <video></video>
            <select name="" id="cameras">
                {
                    cameraOption.map( (item, key) => (
                        <option value={item[0]}>{item[1]}</option>
                    ))
                }
            </select>
            <div>{cameraOption[0]}</div>
        </div>
    );
};

const Video = styled.video`
  width: 100px;
  height: 100px;
`

export default Room;