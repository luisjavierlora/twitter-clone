import { NextResponse } from 'next/server';

import prisma from '../../../../../libs/prismadb'
import serverAuth from '../../../../../libs/serverAuth';

export async function GET(req: Request, {params} : {params : { userId: string}}){
    try {
        
        const userId = params.userId
        console.log("Params", userId)

        if(!userId || typeof userId != 'string'){
            throw new Error('Invalid ID')
        }

        const existingUser = await prisma.user.findUnique({
            where : {
                id :  userId
            }
        })

        const followersCount = await prisma.user.count({
            where : {
                followingIds : {
                    has: userId
                }
            }
        })

        return  NextResponse.json({...existingUser,followersCount})
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}


export async function PATCH(req: Request){
    try {
        const body = await req.json()

        const {currentUser} = await serverAuth()
        const {name,username,bio,profileImage,coverImage} = body as any;
        console.log("body",body)
        if(!name || !username){
            throw new Error('Missing fields')
        }

        const updatedUser = await prisma.user.update({
            where : {
                id : currentUser.id
            },
            data : {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        })


        return  NextResponse.json(updatedUser)

    }
    catch(error){
        console.log(error)
        return new NextResponse(error as string, {status:400})
    }
    
}

