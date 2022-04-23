import axios from 'axios';
import {LocalURL} from './currnetServer'
import {RoomStore} from "../../store/RoomStore";
import {useState, useEffect} from "react";


//POST는 여기부터
const createRoomURL = LocalURL +'/createRoom';

//GET은 여기부터
const getRoomListURL = LocalURL +'/getRooms';


//방개설 API
const createRoom = (roomName) => {
    var param = new URLSearchParams();
    param.append("name", roomName);
    axios.post(createRoomURL, param);
}

//방목록가져오기 API
//나중에 고치기
const getRooms = () => {
    const {update} = RoomStore();
    useEffect(() => {
        axios.get(getRoomListURL).then((e) => {
            console.log("updatetetete")
            update(e.data);
        });
    }, []);
}

export {createRoom, getRooms};