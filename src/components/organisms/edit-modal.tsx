'use client'
import useCurrentUser from "@/hooks/use-current-user";
import useEditModal from "@/hooks/use-edit-modal";
import useUser from "@/hooks/use-user";
import { useCallback, useEffect, useState } from "react";
import Input from "../atoms/input";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "../molecules/modal";
import ImageUpload from "../molecules/image-upload";

const EditModal = () => {
    const {data: currentUser} = useCurrentUser();
    const {mutate : mutateFetcherUser} = useUser(currentUser?.id)
    const editModal = useEditModal();

    const [profileImage,setProfileImage] = useState('');
    const [coverImage,setCoverImage] = useState('');
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [bio,setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    },[
        currentUser?.profileImage,
        currentUser?.coverImage,
        currentUser?.name,
        currentUser?.username,
        currentUser?.bio
    ])


    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/users/${currentUser.id}`, {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })
            mutateFetcherUser();

            toast.success('Updated')
            
        } catch (error){
            toast.error('something went wrong')
        }finally{
            setIsLoading(false)
            editModal.onClose()
        }

    },[ name,username,bio,profileImage,coverImage, mutateFetcherUser,currentUser,editModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
          <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
          <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
          <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}  
          />
          <Input 
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading} 
          />
          <Input 
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            disabled={isLoading} 
          />
        </div>
      )
    
    return ( 
        <Modal
        disabled={isLoading}
        isOpen={editModal.isOPen}
        title="Edit your profile"
        actionLabel="Save"
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
      />
    );
}
 
export default EditModal;