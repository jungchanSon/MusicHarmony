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
import io from 'socket.io-client'
import VideoBox from "../../components/Room/VideoBox";
import {RoomStore} from "../../store/RoomStore";



let socket;
let myPeerConnection;
const Room = () => {
    const [streamPr, setStreamprops ] = useState();

    const rf = useRef();
    const socket = io("http://localhost:4000");
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            setStreamprops(stream);
        });
    }, [])

    const{userStream, setUserStream, setMyPeerConnection} =MediaStreamStore();
    const {usersInRoom, addUser} = RoomStore()
    let myStream;
    var roomID = null;
    var userName = null;

    if (typeof window !== 'undefined') {
        roomID=localStorage.getItem("roomID");
        userName=localStorage.getItem("userName");
    }

    //stomp 말고 socket.io로 ㄹ변경
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
            audio : false,
            video : {facingMode: "user"}
        };
        const cameraConstraints = {
            audio: false,
            video: {deviceId: {exact: deviceId}}
        };
        try{
            myStream = await navigator.mediaDevices.getUserMedia(
                deviceId ? cameraConstraints : initialConstrains
            );
            setUserStream(myStream);
            console.log("ststst", streamPr)
            if (!deviceId) {
                await getCameras();
                console.log("zzzzzzzzzz")
            }
        } catch (e) {
            console.log(e);
        }
    };

//webRTC 사이클
    const handleIce = (data) => {
        console.log("sent candidate");
        socket.emit("ice", data.candidate, roomID);
    }

    const handleAddStream = (data) => {
        console.log("got an event from my peer");
        rf.current.srcObject= data.stream
        console.log(streamPr)
    }

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
        myPeerConnection.addEventListener("icecandidate", handleIce);
        myPeerConnection.addEventListener("addstream", handleAddStream);
        myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));
        console.log("makeCon");
        return myPeerConnection;
    }

    const init = async () => {
        await getMedia();
        makeConnection();
        console.log("initMy");
    }

    useEffect(() =>{
        getMedia().then((e) => {
            makeConnection();
            socket.emit("join", roomID, userName);
            console.log(roomID);
            console.log(userName);
            socket.on("welcome", async (uN) => {
                const offer = await myPeerConnection.createOffer();
                myPeerConnection.setLocalDescription(new RTCSessionDescription(offer));
                socket.emit("offer", offer, roomID);
            });
            socket.on("offer", async (offer) => {
                console.log("offer");
                myPeerConnection.setRemoteDescription(offer);
                const answer = await myPeerConnection.createAnswer();
                myPeerConnection.setLocalDescription(answer);
                socket.emit("answer", answer,roomID);
                console.log(myPeerConnection)
            })
            socket.on("answer", async (answer) => {
                console.log("answer");
                myPeerConnection.setRemoteDescription(answer);
                console.log(myPeerConnection)
            })
            socket.on("ice", ice => {
                console.log("receive ic");
                myPeerConnection.addIceCandidate(ice);
            })
        });
        console.log("qqqqqqqqqqqqqqqqqqqqqqqq");

    }, [])

    const test = () => {
        socket.emit("offer")
    }

    return (
        <div>
            <h1>Room</h1>
            <UserVideo autoPlay></UserVideo>
            <VideoBox streamm={streamPr}     autoPlay></VideoBox>
            <CameraOptions ></CameraOptions>
            <video ref={ rf} style={{width: "100px", height:"100px"}} autoPlay></video>
            <div>
                <Buttons></Buttons>
            </div>
            <button onClick={test}>asdfasdf</button>
        </div>
    );
};

export default Room;