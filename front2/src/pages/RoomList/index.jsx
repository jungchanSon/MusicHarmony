import React, {useEffect} from 'react';
import {RoomStore} from "../../store/RoomStore";
import {LocalURL} from "../api/currnetServer";
import axios from "axios";
import {GetRooms, RoomEnter} from "../api/roomAPI";
import UserNameForm from "../../components/User/userNameForm";

const Room = () => {
    const LocalURL = "http://localhost:8080"

    //roomListStore 업데이트
    const {roomList} = RoomStore();
    GetRooms();
    const arrayRoomList = Array.from(roomList).reverse();

    //방들어가기 클릭
    const enterRoomClick= (e) => {
        localStorage.setItem("roomID", e.target.id)
        localStorage.setItem("roomName", e.target.value)

        RoomEnter(e.target.id);
    }
    return (
        <div>
            <h1 className={"mb-10"}> 이름을 먼저 적어주세요 </h1>
            <UserNameForm />
            <h1 className={"mt-10"}>방 목록</h1>
            {arrayRoomList.map( (item, key) => (
                <li key={key} className={"m-4"} id={item.roomID} onClick={enterRoomClick}>
                    {item.name}
                </li>
            ))}
        </div>
    );
};

export default Room;