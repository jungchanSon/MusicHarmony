import React, {useCallback, useEffect, useRef, useState} from 'react';
import CameraOptions from "../../components/Room/CameraOptions";
import io from 'socket.io-client'
import VideoBox from "../../components/Room/VideoBox";
import {PeerStore} from "../../store/PeerStore";
import {CameraAudioStore} from "../../store/CameraAudioStore";
import styled, {css} from "styled-components";
import VideoRayoutContainer from "../../components/Room/VideoRayoutContainer";

let a = {1234: [1234, 1234]}

const Room = () => {
    let socket;
    socket = io("https://10.20.11.94:4000");

    const {Camera, Audio, currentCamera, currentAudio, setCuurentCamera, setCuurentAudio, addAudio, addCamera, resetCameraAudio, setAudio, setCamera} = CameraAudioStore();

    const [myVideoStream, setMyVideoStream ] = useState();
    const [peerStreamArray, setPeerStreamArray] = useState([]);

    const peerArray = useRef({});

    const {peer, peerStream, setPeer, setStream} = PeerStore();
    const cameraOptions = useRef([])

    let myStream;
    let roomId = null;
    let userName = null;

    if (typeof window !== 'undefined') {
        roomId=localStorage.getItem("roomId");
        userName=localStorage.getItem("userName");
    }

    const getCameras = async () => {
        try{
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === "videoinput");

            cameraOptions.current = cameras
        }catch (e) {console.log(e)}
    }

    const getMedia = async (AudioId) =>  {
        console.log("getMEdia()")
        const init = {
            audio : true,
            video : {facingMode: "user"}
        };
        const change = {
            audio: { deviceId: {exact: AudioId,}},
            video:  {facingMode: "user"}
        };
        try{
            myStream = await navigator.mediaDevices.getUserMedia(
                (AudioId) ? change : init
            );
            // setUserStream(myStream);
            setMyVideoStream(myStream);
            if (!AudioId) {
                await getCameras();
            }
        } catch (e) {
            console.log(e);
        }
    };

//webRTC 사이클

    const makeConnection = useCallback((peerId) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        //현재 구글 stun 서버 막힘.
                        "stun:stun.l.google.com:19302",
                    ],
                },
            ],
        });

        peerConnection.onicecandidate = (e) => {
            socket.emit("ice", {
                candidate: e.candidate,
                sender: socket.id,
                receiverId: peerId,
                room: roomId,
            })
        };



        peerConnection.ontrack = (e) => {
            setPeerStreamArray((peers) => [
                ...peers
                    .filter((peer) => peer.id !== peerId)
                    .concat({
                        id: peerId,
                        stream: e.streams[0],
                    }),
            ]);
        }
        if (myStream)
            myStream.getTracks().forEach((track) => peerConnection.addTrack(track, myStream));

        return peerConnection;
    }, []);

    useEffect(() => {
        getMedia(currentAudio).then(()=> {
            const videoTrack = myStream.getVideoTracks()[0];
            const audioTrack = myStream.getAudioTracks()[0];

            const keys = Object.keys(peerArray.current)

            for (let i = 0; i < keys.length; i++) {
                const videoSender = peerArray.current[keys[i]].getSenders().find((sender) => sender.track.kind === "video");
                const audioSender = peerArray.current[keys[i]].getSenders().find((sender) => sender.track.kind === "audio");
                videoSender.replaceTrack(videoTrack);
                audioSender.replaceTrack(audioTrack);
            }

        });
    }, [currentAudio])

    const init = async () => {

        await getMedia(currentAudio);
        socket.emit("join", roomId);
        console.log("join end");

        socket.on("welcome", async (e) => {
            console.log("welcome start");
            const pc = makeConnection(e);
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            socket.emit("offer", roomId, {
                offer: offer,
                senderId: socket.id,
                receiverId: e,
            })
            peerArray.current = {
                ...peerArray.current,
                [e]: pc
            };
            console.log("welcome end");
        });

        socket.on("offer", async (e) => {
            if (e.receiverId == socket.id) {
                console.log("offer start");
                const pc = makeConnection(e.senderId);
                pc.setRemoteDescription(e.offer);
                const answer = await pc.createAnswer();
                pc.setLocalDescription(answer)

                socket.emit("answer", {
                    answer: answer,
                    senderId: socket.id,
                    receiverId: e.senderId,
                    room: roomId,
                });

                peerArray.current = {
                    ...peerArray.current,
                    [e.senderId]: pc,
                };
                console.log("welcome end");
            }
        })

        socket.on("answer", async (e) => {

            if (e.receiverId == socket.id) {
                console.log("answer start");
                const pc = peerArray.current[e.senderId];
                pc.setRemoteDescription(e.answer);
                console.log("answer end");
            }

        })

        socket.on("ice", async (e) => {
            console.log("ice start", e);

            const pc = peerArray.current[e.sender];
            if (pc)
                pc.addIceCandidate(e.candidate);

        })

        socket.on("exit", async (e) =>{
            delete peerArray.current[e]

            setPeerStreamArray((peer) => peer.filter((item)=> item.id != e));

            console.log("exit End")
        })
        makeConnection();
    }

    useEffect(() => {

        init();
    }, [makeConnection]);

    const mediaCtrl = () => {
        myVideoStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    const soundCtrl = () => {
        myVideoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    return(
        <div>
            <h1>Room</h1>
            <VideoRayoutContainer l={peerStreamArray.length} streamArray={peerStreamArray} myStream={myVideoStream}>
                <VideoBox stream={myVideoStream} autoPlay></VideoBox>
                {
                    peerStreamArray.map((item, key) => (
                        <VideoBox key={key} stream={item.stream} />
                    ))
                }
            </VideoRayoutContainer>

            <CameraOptions>a</CameraOptions>
            <br/>
            <Button onClick={mediaCtrl}>영상 On/Off</Button>
            <Button onClick={soundCtrl}>소리 On/Off</Button>
        </div>
    );
};


const Button = styled.button`
    border: 1px solid black;
    padding: 3px;
    margin-top :3px;
    margin-right: 10px;
`
export default Room;