import React, {useEffect} from 'react';
import {RoomStore} from "../../store/RoomStore";
import {ServerURL} from "../api/currnetServer";
import axios from "axios";
import {GetRooms, RoomEnter} from "../api/roomAPI";
import UserNameForm from "../../components/User/userNameForm";
import styled from "styled-components";

const Room = () => {
    const LocalURL = "http://15.165.82.230:8080"

    //roomListStore 업데이트
    const {roomList} = RoomStore();
    GetRooms();
    const arrayRoomList = Array.from(roomList).reverse();

    //방들어가기 클릭
    const enterRoomClick= (e) => {
        localStorage.setItem("roomId", e.target.id)
        localStorage.setItem("roomName", e.target.value)

        RoomEnter(e.target.id);
    }
    // console.log("page", window.location.pathname)

    return (
        <div>
            <CenterRayout>
            <h1 className={"mb-10"}> 이름을 먼저 적어주세요 </h1> <br/>
            <UserNameForm />
                <br/><br/>

            <h1 className={"mt-10"}>방 목록</h1><br/><br/>
                <GridContainer>
            {arrayRoomList.map( (item, key) => (
                <ListCard key={key} className={"m-4"} id={item.roomId} onClick={enterRoomClick}>
                    {item.name}
                </ListCard>
            ))}
                </GridContainer>
            </CenterRayout>
        </div>
    );
};
const CenterRayout = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    padding: 5%;
`

const ListCard = styled.li`
  margin:10px;
  list-style: none;
  padding: 10px;
  border: 1px solid black;
  color: black;
  cursor: pointer;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: max-content ;
  
`
export default Room;