import { create } from "zustand";

interface LoginModalStore {
    isOPen : boolean
    onOpen : () => void
    onClose : () => void
}

const useLoginModal = create<LoginModalStore>((set) =>({
    isOPen : false,
    onOpen : () => set({isOPen:true}),
    onClose : () => set({isOPen:false})
}))

export default useLoginModal