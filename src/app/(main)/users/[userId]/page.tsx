
'use client'
import { ClipLoader } from "react-spinners";

import EditModal from "@/components/organisms/edit-modal";
import PostFeed from "@/components/organisms/post-feed";
import UserHero from "@/components/molecules/user-hero";
import UserBio from "@/components/molecules/user-bio";
import Header from "@/components/organisms/header";
import useUser from "@/hooks/use-user";


export default function UserView({params} : {params : {userId : string} }) {

    const {data : fetchedUser,isLoading} = useUser(params.userId)

    if(isLoading || !fetchedUser){
        return (
            <div
                className="
                    flex
                    justify-center
                    items-center
                    h-full
                "
            >
                <ClipLoader color="lightblue" size={80}></ClipLoader>
            </div>
        )

    }

    return ( 
        <>
        
            <Header showBackArrow label={fetchedUser?.name}></Header>
            <UserHero userId={params.userId}/>
            <UserBio userId={params.userId}/>
            <EditModal/>
            <PostFeed userId={params.userId}/>
        </>

    );
}
 
