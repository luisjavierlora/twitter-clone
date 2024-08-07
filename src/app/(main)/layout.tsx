import FollowBar from "@/components/molecules/follow-bar";
import NavigationSidebar from "@/components/organisms/navigation-sidebar";
import React from "react";


const MainLayout = async ({children}:{children : React.ReactNode}) => {
    return (  
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
                <NavigationSidebar/>
                <div className="
                    col-span-3
                    lg:col-span-2
                    border-x-[1px]
                    border-neutral-800
                ">
                    {children}
                </div>
                <FollowBar/>
            </div>
        </div>
    );
}
 
export default MainLayout;