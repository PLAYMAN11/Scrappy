import { create }from 'zustand'

const useStore = create((set) => ({
    buscador: "",
    SetBuscador: (value) => set((state) => ({buscador: value}))

}))
export default useStore;