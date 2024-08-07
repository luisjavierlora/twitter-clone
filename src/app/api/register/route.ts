import { NextResponse } from 'next/server';

import prisma from '../../../../libs/prismadb'
import bcrypt from 'bcrypt'




export async function POST(req: Request){
    const body = await req.json()

    try {
        
        const {email, username, name,password} = body;
        const hashedPassword = await bcrypt.hash(password,12)
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }

        })

        return  NextResponse.json(user)
    } catch (error){
        console.log(error)
        return new NextResponse(error as string, {status:400})

    }

}

