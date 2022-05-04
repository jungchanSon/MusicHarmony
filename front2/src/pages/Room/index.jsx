import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Sockjs from "sockjs-client";
import Stomp from "stompjs";
import {UserStore} from "../../store/UserStore";
import UserVideo from "../../components/Room/UserVideo";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import Buttons from "../../components/Room/Buttons";
import CameraOptions from "../../components/Room/CameraOptions";
import {string} from "sockjs-client/lib/utils/random";
import io from 'socket.io'

const Room = () => {
    const socket = io("localhost:8000");
    const{userStream, setUserStream, setMyPeerConnection} =MediaStreamStore();

    let myStream;
    var roomID = null;
    var userName = null;


    let myPeerConnection;

    if (typeof window !== 'undefined') {
        roomID=localStorage.getItem("roomID");
        userName=localStorage.getItem("userName");
    }

    // const connnect =  (stompClient) => {
    //     console.log(roomID);
    //     var socket = new Sockjs('http://localhost:8080/music-harmony');
    //     stompClient = Stomp.over(socket);
    //     stompClient.connect(
    //         {},
    //         frame => {
    //             stompClient.subscribe('/sub/musicRoom/'+roomID, (msg) => {
    //                 var message = JSON.parse(msg.body)
    //
    //                 if(message.type === "ENTER" && message.userName !== userName) {
    //                     const offer = myPeerConnection.createOffer().then(offer => {
    //                         myPeerConnection.setLocalDescription(offer);
    //                         stompClient.send('/pub/musicRoom/offer', {},JSON.stringify({roomID:roomID, userName:userName, description:offer, type:"OFFER"}));
    //                         console.log("Promise.toString(offer)", myPeerConnection);
    //                     });
    //                 }
    //                 else if(message.type === "OFFER" && message.userName !== userName){
    //                     console.log("offer >>>>", message.description);
    //                     // myPeerConnection.setRemoteDescription(message.description);
    //
    //                     const answer = myPeerConnection.createAnswer().then(answer => {
    //                         myPeerConnection.setLocalDescription(answer)
    //                         console.log("mymyPer",myPeerConnection);
    //                     })
    //                 }
    //             });
    //             stompClient.send('/pub/musicRoom/enter',{}, JSON.stringify({roomID:roomID, userName:userName, message:"enter", type:"ENTER"}));
    //
    //         },
    //         error => {
    //             console.log('error', error);
    //         }
    //     );
    // }

    const getCameras = async () => {
        try{
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === "videoinput");

            cameras.forEach(camera => {
                // setCameraOption([...cameraOption, [camera.deviceId, camera.label]])
                // CameraOptionArray.push([camera.deviceId, camera.label])
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

//webRTC 사이클
    const makeConnection = () => {
        myPeerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                    ],
                },
            ],
        });
        // myPeerConnection.addEventListener("icecandidate", handleIce);
        // myPeerConnection.addEventListener("addstream", handleAddStream);
        myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));
        console.log("makeCon", myPeerConnection);
        return myPeerConnection;
    }
    //
    // const setMyPeerLocalDesc = () => {
    //     const offer = myPeerConnection.createOffer();
    //     myPeerConnection.setLocalDescription(offer);
    // }

    const init = async () => {
        await getMedia();
        makeConnection();
        console.log("initMy", myPeerConnection);
        // setMyPeerLocalDesc();
    }

    useEffect(() =>{
        init().then( () => {
            connnect(stompClient);
        });
        // myPeerConnection = new RTCPeerConnection();
    }, [])

    const test = () => {
        socket.emit("offer")
    }

    socket.on("welcome", async () => {

        const offer = await myPeerConnection.createOffer();
        myPeerConnection.setLocalDescription(offer);
        socket.emit("offer", offer);
    });

    return (
        <div>
            <h1>Room</h1>
            <UserVideo autoPlay></UserVideo>
            <CameraOptions></CameraOptions>
            <div>
                <Buttons></Buttons>
            </div>
            <button onClick={test}>asdfasdf</button>
        </div>
    );
};

export default Room;