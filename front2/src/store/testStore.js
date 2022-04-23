import create from 'zustand';

const tempStore = create((set) => ({
    count: 123,
    up(){
        set((state) => ({count: state.count +1}))
    }
}));

export default tempStore;
// 사용 예시