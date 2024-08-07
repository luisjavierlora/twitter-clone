import { NextResponse } from 'next/server';

import serverAuth from '../../../../../libs/serverAuth';
import prisma from '../../../../../libs/prismadb'

export async function POST(req: Request) {
    
    try {
        const body = await req.json()
        const {currentUser} = await serverAuth()

        if(!body.postId || typeof body.postId != 'string'){
            throw new Error('Invalid ID')
        }

        const post = await prisma.post.findUnique({
            where: {
                id: body.postId
            }
        })

        if(!post) {
            throw new Error('Invalid ID')
        }

        let updatedLikedIds = [...(post.likeIds || [])]

        updatedLikedIds.push(currentUser.id)

        const updatePost = await prisma.post.update({where: {id:body.postId}, data : {likeIds : updatedLikedIds}})

        return  NextResponse.json(updatePost)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }



}


export async function DELETE(req: Request) {
    
    try {
        const body = await req.json()
        const {currentUser} = await serverAuth()

        if(!body.postId || typeof body.postId != 'string'){
            throw new Error('Invalid ID')
        }

        const post = await prisma.post.findUnique({
            where: {
                id: body.postId
            }
        })

        if(!post) {
            throw new Error('Invalid ID')
        }

        let updatedLikedIds = [...(post.likeIds || [])]

        updatedLikedIds.filter((likeId) => likeId != currentUser.id)

        const updatePost = await prisma.post.update({where: {id:body.postId}, data : {likeIds : updatedLikedIds}})

        return  NextResponse.json(updatePost)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}