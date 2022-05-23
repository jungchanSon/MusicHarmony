import create from 'zustand'

const PeerStore = create(set => ({
    peer: {},
    peerStream: [{1:1}],

    setPeer: (socketId, pc) => set((state) => ({
        peer: {...state.peer, [socketId]:[pc]}
    })),

    setStream:(socketId, stream) => set((state) => ({
        peerStream: [...state.peerStream,
            {
                id: socketId,
                stream: stream
            }
        ]
    })),

}));

export {PeerStore};