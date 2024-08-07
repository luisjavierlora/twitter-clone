import { NextResponse } from 'next/server';

import prisma from '../../../../../libs/prismadb'

export async function GET(req: Request, {params} : {params : { postId: string}}){
    try {
        
        const postId = params.postId

        let posts

        if(!postId || typeof postId != 'string'){
        
            throw new Error('Invalid ID')
        
        } 

        const post = await prisma.post.findUnique({
            where : {
                id: postId
            },
            include: {
                user:true,
                comments:{
                    include: {
                        user : true
                    },
                    orderBy : {
                        createdAt : 'desc'
                    }
                },

            }
        })

        return  NextResponse.json(posts)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}