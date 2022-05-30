import React, {useCallback, useEffect, useRef, useState} from 'react';
import UserVideo from "../../components/Room/UserVideo";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import Buttons from "../../components/Room/Buttons";
import CameraOptions from "../../components/Room/CameraOptions";
import io from 'socket.io-client'
import VideoBox from "../../components/Room/VideoBox";
import {RoomStore} from "../../store/RoomStore";
import axios from "axios";
import {PeerStore} from "../../store/PeerStore";

let myPeerConnection;

    let a = {1234: [1234, 1234]}

const Room = () => {
    let socket;
    socket = io("http://localhost:4000");

    const [myVideoStream, setMyVideoStream ] = useState();
    // const [peerArray, setPeerArray] = useState({});
    const [peerStreamArray, setPeerStreamArray] = useState([]);

    const peerArray = useRef({});
    // const peerStreamArray = useRef({});

    const {peer, peerStream, setPeer, setStream} = PeerStore();

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

            // cameras.forEach(camera => {
            //     setCameraOption([...cameraOption, [camera.deviceId, camera.label]])
            //     CameraOptionArray.push([camera.deviceId, camera.label])
            // })

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

            // setUserStream(myStream);
            setMyVideoStream(myStream);
            if (!deviceId) {
                await getCameras();
            }
        } catch (e) {
            console.log(e);
        }
    };

//webRTC 사이클
    const handleIce = (data) => {
        socket.emit("ice", data.candidate, roomId);
    }

    const handleAddStream = (data) => {
        console.log("got an event from my peer");
        rf.current.srcObject= data.stream

    }

    const makeConnection = useCallback((peerId) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
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

        // peerConnection.addEventListener("addstream", (data) => {
        //     console.log("addStream", peerId, data.stream, peerStreamArray);
        //     // setStream(peerId, data.Stream)
        //     setPeerStreamArray((peerStreamArray) => [
        //         ...peerStreamArray,
        //         {id: peerId, stream: data.stream},
        //     ])
        // });


        peerConnection.ontrack = (e) => {
            setPeerStreamArray((peers) => [
                ...peers
                    .filter((peer) => peer.id !== peerId)
                    .concat({
                        id: peerId,
                        stream: e.streams[0],
                    }),
        ]);
            console.log("ontrack");
        }
        if (myStream)
            myStream.getTracks().forEach((track) => peerConnection.addTrack(track, myStream));

        return peerConnection;
    }, []);

    const init = async () => {

        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            setMyVideoStream(stream);
        });

        await getMedia();
        makeConnection();
    }

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
            setMyVideoStream(stream);
        });
        getMedia().then(() => {

            console.log("join start");
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

                console.log("peerArray", peerArray.current);
                console.log("welcome end");
            });

            socket.on("offer", async (e) => {
                console.log("get offer");
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
                    console.log("peerArray", peerArray.current)
                    const pc = peerArray.current[e.senderId];
                    pc.setRemoteDescription(e.answer);
                    // const sockId = e.senderId;
                    // peerArray.current = {
                    //     ...peerArray.current,
                    //     [sockId]: pc
                    // }
                    console.log("answer end");
                }

            })

            socket.on("ice", async (e) => {
                console.log("ice start", e);

                const pc = peerArray.current[e.sender];
                console.log("const pc = peerArray.current[e.senderId]", pc)
                // if( e.receiverId == socket.id)
                if (pc)
                    pc.addIceCandidate(e.candidate);

                console.log("ice end");
                console.log("peerArr", peerArray.current)
                console.log("peerStreaArr", peerStreamArray)
            })

            socket.on("exit", async (e) =>{
                console.log("exit Start")

                // peerArray.current = {
                //     ...peerArray.current,
                //     [e.senderId]: pc,
                // };

                // peerArray.current = peerArray.current.filter((user) => user.id != e)
                console.log(e)
                console.log("eee", peerArray.current[e])
                delete peerArray.current[e]

                setPeerStreamArray((peer) => peer.filter((item)=> item.id != e));

                console.log("exit End")
            })
        });
    }, [makeConnection]);

    const mediaCtrl = () => {
        myVideoStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    const soundCtrl = () => {
        myVideoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    const test = ()=> {
        console.log("peerStreamArray", peerStreamArray)
        console.log("peerArray", peerArray)
    }
    return(
        <div>
            <button onClick={test}>test</button>
            <h1>Room</h1>
            <VideoBox stream={myVideoStream} autoPlay></VideoBox>

            {
                peerStreamArray.map((item, key) => (
                    <VideoBox key={key} stream={item.stream} />
                ))
            }

            <CameraOptions>a</CameraOptions>
            <button onClick={mediaCtrl}>영상</button>
            <button onClick={soundCtrl}>소리</button>
        </div>
    );
};

export default Room;