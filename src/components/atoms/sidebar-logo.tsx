'use client'

import { BsTwitter} from 'react-icons/bs'
import { useRouter } from "next/navigation";

const SidebarLogo = () => {
    const router = useRouter()

    return (
        <div
        onClick={() => router.push('/')}
        className="
            rounded-full
            h-14
            w-14
            p-4
            flex
            item-center
            justify-center
            hover:bg-blue-300
            hover:bg-opacity-10
            cursor-pointer
            transition
        ">
            <BsTwitter size={20} color="white"/>
        </div>
    );
}
 
export default SidebarLogo;