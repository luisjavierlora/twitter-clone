import { useCallback } from "react"
import Image from 'next/image'

import useUser from "@/hooks/use-user"
import { useRouter } from "next/navigation"
import { url } from "inspector"

interface AvatarProps {
    userId : string,
    isLarge? : boolean,
    hasBorder? : Boolean
}


const Avatar : React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder
}) => {
    const router = useRouter()
    const {data : fetcherUser} = useUser(userId)

    const onClick = useCallback((event : any) =>{
        event.stopPropagation()

        const url =`/users/${userId}`

        router.push(url)
    },[userId,router])

    return (
        <div
           className={`
            ${hasBorder ? 'border-4 border-black' : ''}
            ${isLarge ? 'h-32' : 'h-12'}
            ${isLarge ? 'w-32' : 'w-12'}
            rounded-full
            hover:opacity-90
            transition
            cursor-pointer
            relative
            `}
        
        >

            <Image
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    borderRadius : '100%'
                }}
                alt='Avatar'
                onClick = {onClick}
                src = {fetcherUser?.profileImage || '/images/placeholder.png' }
            />


            
        </div>
    )
}

export default Avatar