import React from "react";

interface CommentFeedProps {
    comments? : Record<string,any>[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({comments}) => {
    return ( 
        <>
            {comments?.map((comment) => {
                <CommentItem key={comment.id} />
            })}
        </>
     );
}
 
export default CommentFeed;