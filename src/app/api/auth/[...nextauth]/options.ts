import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

const options: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                if(!credentials) return null
                const user = await prisma.user.findFirst({
                    where: {
                        name: credentials.username
                    }
                })
                if(!user) return null;
                const isValidPwd = await bcrypt.compare(credentials.password, user.hashedPassword as string);
                
                if(!isValidPwd)return null;
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                };
            }
        })
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if(account?.provider) {
                const isInDatabase = await prisma.user.findUnique({
                    where: {
                        name: user.name as string,
                    }
                });
                if(!isInDatabase){
                    const newUser = await prisma.user.create({
                        data: {
                            name: user.name as string,
                            email: user.email as string,
                            image: user.image as string,
                        }
                    })
                }
            }
            return true
        }
    }
}

export default options;