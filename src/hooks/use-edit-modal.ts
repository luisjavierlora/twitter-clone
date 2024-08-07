import { create } from "zustand";

interface EditModalStore {
    isOPen : boolean
    onOpen : () => void
    onClose : () => void
}

const useEditModal = create<EditModalStore>((set) =>({
    isOPen : false,
    onOpen : () => set({isOPen:true}),
    onClose : () => set({isOPen:false})
}))

export default useEditModal