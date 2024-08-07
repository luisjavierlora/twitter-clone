import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

interface CommentItemProps {
    data : Record<string,any>
}

const CommentItem : React.FC<CommentItemProps>= ({data}) => {
    const router = useRouter()

    const goToUser = useCallback((event : any) => {
        event.stopPropagation();

        router.push(`users/${data.user.id}`)
    },[router, data.user.id])

    const createdAt = useMemo(() => {

    },[])

    return ( <div>

    </div> );
}
 
export default CommentItem;