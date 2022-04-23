import React from 'react';
import connnect from '/src/pages/api/socketConnect'
import create from 'zustand';

const MakeRoom = () => {
    const tempstate = create((set) => ({
        temp : 'temp',
        updatetemp(data) {
            set((state) => ({ temp: data}))
        }
    }))

    var stompClient = null;
    connnect(stompClient);

    // stompClient.send()
    axios.post('http://localhost:8080/roomCreate', {
        roomName : 'name',
    });

    var response = axios.get('http://localhost:8080/getRooms')

    return (
        <div>

            <h1>ListRooms </h1>

            <button onClick={updatetemp(response)}></button>
        </div>
    );
};

export default MakeRoom;