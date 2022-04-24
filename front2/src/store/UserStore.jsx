import create from 'zustand'

const RoomStore = create(set => ({
    userName: "",
    setUserName: (newName) => set((e) => ({userName: newName})),
}));

export {RoomStore};