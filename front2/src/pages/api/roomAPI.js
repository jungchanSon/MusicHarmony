import axios from 'axios';
import {LocalURL}from './currnetServer'

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
const getRooms = () => {
    const roomList = axios.get(getRoomListURL);

    return roomsList;
}

export {createRoom, getRooms};