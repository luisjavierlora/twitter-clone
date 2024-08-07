import { NextResponse } from 'next/server';

import serverAuth from '../../../../libs/serverAuth';
import prisma from '../../../../libs/prismadb'

export async function POST(req: Request) {
    
    try {
        const {currentUser} = await serverAuth()
        const {body,postId} = await req.json()

        const updatePost = await prisma.comment.create({ data : {body, userId : currentUser.id, postId}})

        return  NextResponse.json(updatePost)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}
