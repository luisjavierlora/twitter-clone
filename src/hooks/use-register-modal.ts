import { create } from "zustand";

interface RegisterModalStore {
    isOPen : boolean
    onOpen : () => void
    onClose : () => void
}

const useRegisterModal = create<RegisterModalStore>((set) =>({
    isOPen : false,
    onOpen : () => set({isOPen:true}),
    onClose : () => set({isOPen:false})
}))

export default useRegisterModal