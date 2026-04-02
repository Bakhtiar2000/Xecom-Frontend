import type { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"; 

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        
        FacebookProvider({ 
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

     callbacks: {
        async signIn({ user, account, profile }) {
            console.log("=== SIGN IN DATA ===");
            console.log("user:", user);         
            console.log("account:", account);   
            console.log("profile:", profile);   
            return true; 
        },

        async session({ session, token }) {
            console.log("=== SESSION DATA ===");
            console.log("session:", session);
            console.log("token:", token);
            return session;
        },

        async jwt({ token, user, account, profile }) {
            console.log("=== JWT DATA ===");
            console.log("token:", token);
            console.log("user:", user);
            return token;
        }
    }
};