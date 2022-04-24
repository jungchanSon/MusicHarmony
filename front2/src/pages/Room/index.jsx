import React from 'react';
import styled from "styled-components";
import connnect from "../api/socketConnect";
const Room = () => {
    //서버 소켓 연결.
    connnect();

    return (
        <div>
            <h1>Room</h1>
            <video></video>
            <video></video>
        </div>
    );
};

const Video = styled.video`
  width: 100px;
  height: 100px;
`

export default Room;