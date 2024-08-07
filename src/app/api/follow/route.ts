import { NextResponse } from 'next/server';

import serverAuth from '../../../../libs/serverAuth';
import prisma from '../../../../libs/prismadb'

export async function DELETE(req: Request){
    try {
        const {userId} = await req.json()
        const {currentUser} = await serverAuth()
        console.log(userId)
        if(!userId || typeof userId != 'string'){
            throw new Error('Invalid ID')
        }

        const userToUnfollow = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!userToUnfollow){
            throw new Error('Invalid ID')
        }

        let currentFollowingIds = [...(currentUser.followingIds || [] ) ]
        currentFollowingIds = currentFollowingIds.filter((followingId) => followingId !== userId);

        const updatedUser = await prisma.user.update({
            where : {
                id : currentUser.id
            },
            data: {
                followingIds :currentFollowingIds
            }
        })

        return  NextResponse.json(updatedUser)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}


export async function POST(req: Request) {
    
    try {
        const body = await req.json()
        const {currentUser} = await serverAuth()

        if(!body.userId || typeof body.userId != 'string'){
            throw new Error('Invalid ID')
        }

        const userTofollow = await prisma.user.findUnique({
            where: {
                id: body.userId
            }
        })

        if(!userTofollow){
            throw new Error('Invalid ID')
        }

        let currentFollowingIds = [...(currentUser.followingIds || [] ) ]
        currentFollowingIds.push(userTofollow.id)

        const updatedUser = await prisma.user.update({
            where : {
                id : currentUser.id
            },
            data: {
                followingIds :currentFollowingIds
            }
        })

        return  NextResponse.json(updatedUser)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }



}
