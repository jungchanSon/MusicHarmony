import create from 'zustand'

const MediaStreamStore = create(set => ({
    userStream: null,
    myPeerConnection: null,
    setUserStream: (stream) => set((state) => ({userStream: stream})),
    setMyPeerConnection: (data) => set((state) => ({myPeerConnection: data})),
}));

export {MediaStreamStore};