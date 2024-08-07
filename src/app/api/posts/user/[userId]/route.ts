import { NextResponse } from 'next/server';

import prisma from '../../../../../../libs/prismadb'

export async function GET(req: Request, {params} : {params : { userId: string}}){
    try {
        
        const userId = params.userId
        console.log("param slug", userId)
        let posts

        if(userId || typeof userId == 'string'){
        
            posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include : {
                    user :true,
                    comments : true
                },
                orderBy : {
                    createdAt : 'desc'
                }
            })
        
        } else {
            posts = await prisma.post.findMany({
                include : {
                    user: true,
                    comments : true
                }, 
                orderBy : {
                    createdAt : 'desc'
                }    
            })
        }


        return  NextResponse.json(posts)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}

