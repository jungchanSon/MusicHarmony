import React from 'react';
import connnect from '/src/pages/api/socketConnect'

const MakeRoom = () => {
    var stompClient = null;
    connnect(stompClient);

    stompClient.send()

    return (
        <div>
            <h1>ListRooms </h1>
        </div>
    );
};

export default MakeRoom;