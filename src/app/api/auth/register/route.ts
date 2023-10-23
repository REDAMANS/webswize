import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/server-helpers";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

interface User {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const { name, email, password }: User = await req.json();
        if(!name || !email || !password){
            return NextResponse.json({
                message: "All Fields are required",
                status: 422
            })
        }
        await connectToDatabase();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({ data: { email, name, hashedPassword } });
        return NextResponse.json({ user: newUser, status: 201 })
    }catch(err) {
        return NextResponse.json({
            message: "Server error",
            status: 500
        })
    }finally {
        await prisma.$disconnect();   
    }
}