import { NextResponse } from 'next/server';

import serverAuth from '../../../../libs/serverAuth';
import prisma from '../../../../libs/prismadb'

export async function POST(req: Request){
    try {
        const {body} = await req.json()
        const {currentUser} = await serverAuth()

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        })

        return  NextResponse.json(post)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}



export async function GET(req: Request){

    try {
        console.log("param 1")

        let posts = await prisma.post.findMany({
            include : {
                user: true,
                comments : true
            }, 
            orderBy : {
                createdAt : 'desc'
            }    
        })

        return  NextResponse.json(posts)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }


}