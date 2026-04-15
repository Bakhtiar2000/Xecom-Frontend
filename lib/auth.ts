import type { NextAuthOptions } from "next-auth";

import { useGoogleLoginMutation } from "@/redux/features/auth/auth.api";

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

            if (account?.provider === "google" || account?.provider === "facebook") {
              try {
                  const response = await fetch(
                    `${process.env.API_URL}/auth/google-login`,
                  {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({
                   email: user.email,
                    name: user.name,
                   profilePicture: user.image,
                    }),
                  }
                 );

                  const data = await response.json();

                  if (data.success && data.data.accessToken) {

                  (user as any).backendToken = data.data.accessToken;
                  return true;
                 }

                return false; 
              } catch (error) {
                  console.error("Backend API error:", error);
                  return false;
             }
            }

         return true;
        },

        async session({ session, token }) {
            console.log("=== SESSION DATA ===");
            console.log("session:", session);
            console.log("token:", token);
            if (token.backendToken) {
            (session as any).backendToken = token.backendToken;
            }
            return session;
        },

        async jwt({ token, user, account, profile }) {
            console.log("=== JWT DATA ===");
            console.log("token:", token);
            console.log("user:", user);
            if (user && (user as any).backendToken) {
             token.backendToken = (user as any).backendToken;
             }
            return token;
        }
    }
};