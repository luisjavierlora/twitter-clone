'use client'
import useSWR from 'swr';
import fetcher from '../../libs/fetcher';
import useCurrentUser from './use-current-user';
import usePost from './use-post';
import usePosts from './use-posts';
import useLoginModal from './use-login-modal';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const useLike = ({postId,userId} :{postId :string, userId?:string}) => {
    const {data:currentUser} = useCurrentUser();
    const {data: fetchedPost, mutate : mutateFetchedPost} = usePost(postId)
    const {mutate : mutateFetchedPosts} = usePosts(userId)


    const loginModal = useLoginModal();

    const hasLiked = useMemo( () => {
        const list = fetchedPost?.likeIds || [];

        return list.includes(currentUser?.id)
    },[currentUser?.id, fetchedPost?.likeIds])

    const toggleLike = useCallback(async () => {
        if(!currentUser){
            return loginModal.onOpen()
        }

        try {
            let request;

            if(hasLiked){
                request = () => axios.delete('/api/post/like', {data : {postId}})
            }else{
                request = () => axios.post('api/post/like',{data: {postId}})
            }

            await request();
            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success('Sucess')

        }catch (error) {
            toast.error('Something went wrong')
        }

    },[
        currentUser,
        hasLiked,
        postId,
        mutateFetchedPost,
        mutateFetchedPosts,
        loginModal
    ])

  return {
    hasLiked,
    toggleLike
  }
};

export default useLike;