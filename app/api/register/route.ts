import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import {NextResponse} from "next/server";

export async function POST(
    request : Request
){
    const body  = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    const hPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data : {
            email, name, password : hPassword,
        }
    });

    return NextResponse.json(user)
}