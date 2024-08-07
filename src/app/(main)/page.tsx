import Header from "../../components/organisms/header";
import LoginModal from '@/components/organisms/login-modal'
import RegisterModal from '@/components/organisms/register-modal'
import Form from "@/components/organisms/form";
import PostFeed from "@/components/organisms/post-feed";

export default function Home() {
    return (<>
        <Header label="Home" />
        <LoginModal />
        <RegisterModal />
        <Form placeholder="What's happening?"></Form>
        <PostFeed  />
    </>);
}
 
