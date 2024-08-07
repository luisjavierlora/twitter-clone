import { ClipLoader } from "react-spinners"

import CommentFeed from "@/components/organisms/comment-feed"
import PostItem from "@/components/molecules/post-item"
import Header from "@/components/organisms/header"
import Form from "@/components/organisms/form"
import usePost from "@/hooks/use-post"

export default function PostView({params} : {params : {postId : string} }) {
    const {data : fetchedPost,isLoading} = usePost(params.postId)

    if(isLoading || !fetchedPost){
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

    return (<>
        <Header showBackArrow label='Tweet '/>
        <PostItem data={fetchedPost} />
        <Form 
            postId={params.postId}
            isComment
            placeholder="Tweet your reply"
            
        />
        <CommentFeed comments={fetchedPost?.comments}/>
    </>)
}


