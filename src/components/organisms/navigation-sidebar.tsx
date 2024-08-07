'use client'
import { BsHouseFill,BsBellFill} from 'react-icons/bs'
import { BiLogOut} from 'react-icons/bi'
import {FaUser} from 'react-icons/fa'
import SidebarLogo from '../atoms/sidebar-logo'
import SidebarItem from '../molecules/sidebar-item'
import SidebarTweetButton from '../atoms/sidebar-tweet-button'
import { signOut, useSession } from 'next-auth/react'
import useCurrentUser from '@/hooks/use-current-user'

const NavigationSidebar = () =>{

    const {data : currentUser} = useCurrentUser()

    const items = [
        {
            label: 'Home',
            href : '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href : '/notifications',
            icon: BsBellFill,
            auth : true
        },
        {
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon : FaUser,
            auth : true
        }
    ]

    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo/>
                    {items.map((item)=> (
                        <SidebarItem
                        key = {item.href}
                        href = {item.href}
                        label = {item.label}
                        icon = {item.icon}
                        auth = {item.auth}
                        />
                    ))}
                
                  {
                   currentUser?.id &&
                  (<SidebarItem onClick={()=>signOut()}  icon={BiLogOut} label='Logout'/>)
                  }
                  <SidebarTweetButton/>

                </div>
            </div>
        </div>
    )
}


export default NavigationSidebar