import create from 'zustand'

const MediaStreamStore = create(set => ({
    userStream: null,
    setUserStream: (stream) => set((state) => ({userStream: stream})),
    setCameraOff: (input) => set((state) => ({
    })),
}));

export {MediaStreamStore};