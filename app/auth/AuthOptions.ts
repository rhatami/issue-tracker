import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";


async function check_user(user:string|undefined , pass:string|undefined){
    if(!user || !pass)
        return null;

    const fetchedUser = await prisma.user.findUnique({where:{username:user}});
    if(!fetchedUser)
        return null;

   // const passwordMatch = await bcrypt.compare(pass,fetchedUser.hashedPassword!);
   const passwordMatch = true;
    if(!passwordMatch)
        return null;

    return fetchedUser;
};

export const AuthOptions :NextAuthOptions = {
    adapter:PrismaAdapter(prisma), 
    providers:[
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: "UserName", type: "text", placeholder: "Username" },
            password: { label: "Password", type: "password" , placeholder: "Password"  }
        },
       async authorize(credentials,req){
           return check_user(credentials?.username,credentials?.password);
       }
    })], session:{
        strategy:'jwt'
    }};