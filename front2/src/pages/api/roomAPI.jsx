import axios from 'axios';
import {ServerURL} from './currnetServer'
import {RoomStore} from "../../store/RoomStore";
import {useState, useEffect} from "react";


//POST는 여기부터
const createRoomURL = ServerURL +'createRoom';

//GET은 여기부터
const getRoomListURL = ServerURL +'getRooms';
const getRoomEnterURL = ServerURL +'enterRoom/'

//방 입장
//TODO : 서버 리다이렉트로 고쳐보기
const RoomEnter = (roomId) => {
    axios.get(getRoomEnterURL+roomId).then(e =>{
        if(e.data == "Ok")
            location.href = "http://15.165.82.230:3000/Room";
    }).then(() => {
        var param = new URLSearchParams();
        param.append("roomId", roomId);
        param.append("userId", localStorage.getItem("userName"));
        axios.post(localURL +"addUser", )
    })
}

//방개설 API
const CreateRoom = (roomName) => {
    var param = new URLSearchParams();
    param.append("name", roomName);
    axios.post(createRoomURL, param);
}

//방목록가져오기 API
//나중에 고치기
//TODO : 서버에 있는 모든 방목록 불러옴 => 일정 분량만큼 가져오는 식으로 바꾸기
const GetRooms = () => {
    const {update} = RoomStore();
    useEffect(() => {
        axios.get(getRoomListURL).then((e) => {
            update(e.data);
        });
    }, []);
}

export {CreateRoom, GetRooms, RoomEnter};