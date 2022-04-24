import create from 'zustand'

const RoomStore = create(set => ({
    userName: "",
    mute: false,
    camera: false,

    setUserName: (newName) => set((e) => ({userName: newName})),
    switchMute: () => set( (e) => ({mute: !e.mute})),
    switchCamera: () => set( (e) => ({camera: !e.camera }))
}));

export {RoomStore};