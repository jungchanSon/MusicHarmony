import create from 'zustand'

const RoomStore = create(set => ({
    roomList: {aa:'aa'},
    roomName: "",
    usersInRoom: [],

    update: (newData) => set((e) => ({roomList: newData})),
    setRoomName: (roomName) => set((e) =>({roomName: roomName})),
    addUser: (user) => set((e)=>({userInRoom: e.userInRoom.push(user)}))

}));

export {RoomStore};