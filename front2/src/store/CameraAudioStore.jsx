import create from 'zustand'

const CameraAudioStore = create(set => ({
    Camera: [],
    Audio: [],

    currentCamera: null ,
    currentAudio: null ,


    addCamera: (i) => set((e) => ({Camera: e.Camera.push(i)})),
    addAudio: (i) => set((e) => ({Audio: e.Audio.push(i) })),

    setCamera: (i) => set((e) => ({Camera: i })),
    setAudio: (i) => set((e) => ({Audio: i })),

    setCuurentCamera:(i) => set((e) => ({currentCamera: i})),
    setCuurentAudio:(i) => set((e) => ({currentAudio: i})),

    resetCameraAudio: (i) => set((e) => ({Camera: [], Audio: []}))



}));

export {CameraAudioStore};