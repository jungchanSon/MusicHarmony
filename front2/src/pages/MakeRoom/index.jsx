import React, {useState} from 'react';
import styled from "styled-components";
import connnect from '/src/pages/api/socketConnect'
import {CreateRoom} from '../api/roomAPI'


const MakeRoom = () => {
    const [title, setTitle] = useState("");

    // var stompClient = null;
    // connnect(stompClient);
    // stompClient.send()

    const createSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        CreateRoom(title);
        setTitle("")
    }
    return (
        <div>
            <h1 className={"text-4xl"} >방 개설하기 </h1>
            <div>원하는 방 이름을 적어주세요</div>
            <RoomForm>
                <FormInput
                    type="text"
                    value={title}
                    placeholder={"방 개설하기"}
                    onChange={e => {setTitle(e.target.value)}}
                />
                <FormButon onClick={createSubmit} className={"bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"}>개설하기</FormButon>
            </RoomForm>

            {/*<button onClick={updatetemp(response)}></button>*/}
        </div>
    );
};

const RoomForm = styled.form`
`
const FormInput =styled.input`

`
const FormButon = styled.button``

export default MakeRoom;