import create from 'zustand'

const RoomStore = create(set => ({
    roomList: {aa:'aa'},
    update: (newData) => set((e) => ({roomList: newData})),
    up(newdata) {
        set((state) => ({roomList : newdata}))
    }
}));

export {RoomStore};