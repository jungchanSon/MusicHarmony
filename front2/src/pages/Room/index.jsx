import React, {useEffect, useRef, useState} from 'react';
import UserVideo from "../../components/Room/UserVideo";
import {MediaStreamStore} from "../../store/MediaStreamStore";
import Buttons from "../../components/Room/Buttons";
import CameraOptions from "../../components/Room/CameraOptions";
import io from 'socket.io-client'
import VideoBox from "../../components/Room/VideoBox";
import {RoomStore} from "../../store/RoomStore";
import axios from "axios";

let userss =[];
let socket;
let myPeerConnection;
const Room = () => {
    const [streamPr, setStreamprops ] = useState();
    const [asdf, useAsdf] = useState(["asdf", "asdf" ,"asdf" ,"asdf" ]);

    const [userss, setUserss] = useState([]);

    const rf = useRef();
    const socket = io("http://localhost:4000");
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            setStreamprops(stream);
        });
    }, [])

    const{userStream, setUserStream, setMyPeerConnection} =MediaStreamStore();
    const {usersInRoom,userlen, addUser, setUserLen} = RoomStore()
    let myStream;
    var roomId = null;
    var userName = null;

    if (typeof window !== 'undefined') {
        roomId=localStorage.getItem("roomId");
        userName=localStorage.getItem("userName");
    }

    //stomp 말고 socket.io로 ㄹ변경
    // const connnect =  (stompClient) => {
    //     console.log(roomId);
    //     var socket = new Sockjs('http://localhost:8080/music-harmony');
    //     stompClient = Stomp.over(socket);
    //     stompClient.connect(
    //         {},
    //         frame => {
    //             stompClient.subscribe('/sub/musicRoom/'+roomId, (msg) => {
    //                 var message = JSON.parse(msg.body)
    //
    //                 if(message.type === "ENTER" && message.userName !== userName) {
    //                     const offer = myPeerConnection.createOffer().then(offer => {
    //                         myPeerConnection.setLocalDescription(offer);
    //                         stompClient.send('/pub/musicRoom/offer', {},JSON.stringify({roomId:roomId, userName:userName, description:offer, type:"OFFER"}));
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
    //             stompClient.send('/pub/musicRoom/enter',{}, JSON.stringify({roomId:roomId, userName:userName, message:"enter", type:"ENTER"}));
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
        socket.emit("ice", data.candidate, roomId);
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

    const makeConnections = (user) => {
        const pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                    ],
                },
            ],
        });
        pc.addEventListener("icecandidate", handleIce);
        pc.addEventListener("addstream", (data) => {
            let tempUsers = userss.filter((e) => e.id === user);
            tempUsers.stream = data.stream;
            let tempUser2 = userss.filter((e) => e.id !== user);
            setUserss(tempUser2.concat(tempUsers))
        });

        myStream.getTracks().forEach((track) => pc.addTrack(track, myStream));

        //
        // const offer = pc.createOffer();
        // pc.setLocalDescription(offer);

        // pc.ontrack = (e) => {
        //     setUserss(userss.filter((e) => e.id !== user)
        //         .concat({
        //             "id": user,
        //             "pc": pc,
        //             "stream": e.stream,
        //         })
        //     )
        // }
        console.log("makeCon");
        return pc;
    }

    const init = async () => {
        await getMedia();
        makeConnections();
        console.log("initMy");
    }

    useEffect(() =>{
        getMedia().then((e) => {
            socket.emit("join", roomId, userName);
            socket.on("welcome", async (users) => {
                console.log(users)
                users.forEach((user) => {
                    const pc = makeConnections(user);
                    const offer = pc.createOffer();
                    pc.setLocalDescription(offer);
                    if(user){
                        // addUser({
                        //     "id": user,
                        //     "pc": pc,
                        // });
                        setUserss([...userss, {
                            "id": user,
                            "pc": pc,
                        }])
                    }
                    console.log("users.push()")
                    socket.emit("offer", {
                        "sdp" : offer,
                        "sender": socket.id,
                        "receive": user.id
                    })
                })

                usersInRoom.forEach((user) => {
                    const offer = user[1].createOffer();
                    socket.emit("offer", {
                        "sdp": offer,
                        "sender": socket.id,
                        "receive": user.id
                    })
                })
            });
            socket.on("offer", async (offer) => {

                // const targetUser = userss.find(user => user.id === offer.sender);
                // const pc = targetUser.pc;


                const pc = makeConnections(offer.sender);

                pc.setRemoteDescription(offer.sdp);
                const answer = await pc.createAnswer();
                pc.setLocalDescription(answer);

                socket.emit("answer",{
                    sdp: answer,
                    sender: socket.id,
                    receive: offer.sender,
                });
                console.log("offer");
            })

            socket.on("answer", async (answer) => {

                const targetUser = userss.find(user => user.id === answer.sender);
                const pc = targetUser.pc;

                pc.setRemoteDescription(new RTCSessionDescription(answer.sdp));

                console.log("answer");
            })

            socket.on("ice", ice => {

                const targetUser = userss.find(user => user.id === ice.sender);
                const pc = targetUser.pc;

                pc.addIceCandidate(new RTCIceCandidate(ice.ice));

                console.log("receive ic");
            })
        });
        console.log("qqqqqqqqqqqqqqqqqqqqqqqq");

    }, [])

    const test = () => {
        socket.emit("offer")
    }

    return (
        <div>
            <button onClick={e => console.log(userss.length)}>bbbbbbbbb</button>
            <button onClick={e => console.log(userss)}>bbbbbbbbb</button>
            <button onClick={e => {
                console.log(asdf);
            }}>zxczczxc</button>
            <h1>Room</h1>
            <UserVideo autoPlay></UserVideo>
            <VideoBox streamm={streamPr} autoPlay></VideoBox>
            {userss.map((user, index) => (
                <div key={index}> {user.stream} </div>
            ))}
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