import React, {useEffect} from 'react';
import {RoomStore} from "../../store/RoomStore";
import {LocalURL} from "../api/currnetServer";
import axios from "axios";
import {getRooms} from "../api/roomAPI";

const Room = () => {
    const {roomList} = RoomStore();
    getRooms();
    console.log("roomList[0]", roomList[0]);

    return (
        <div>
            <h1>방 목록</h1>
            {roomList.map( item => (
                <li>
                    {item.name}
                </li>
            ))}
        </div>
    );
};

export default Room;