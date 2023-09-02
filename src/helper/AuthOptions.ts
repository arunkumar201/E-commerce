// import { randomBytes, randomUUID } from "crypto";

// import {
//   addNewUser,
//   isUserExists,
//   updateUser,
// } from "@/app/_actions/addNewUser";

// import { MongooseError } from "mongoose";

import { NextAuthOptions } from "next-auth";
import { authProviders } from "./ProvidersList";
import { error } from "console";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60*60*24*30, // 30 days

    /* 
   The session token is usually either a random UUID or string, however if you
   need a more customized session token string, you can define your own generate function.
   generateSessionToken: () => {
     return randomUUID?.() ?? randomBytes(32).toString("hex")
   }
   */
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge=30days`.
    // maxAge: 10,
  },
  providers: authProviders,
  pages: {
    signOut: "/",
    signIn: "/login",
    error: "/login",
    newUser:"/user"
  },
  callbacks: {
    async signIn({ account, user }) {
    //   if (user && account) {
    //     const isExist = await isUserExists(user?.email, account?.provider);
    //     if (!isExist) {
    //       try {
    //         await addNewUser({ account, user });
    //       } catch (err: MongooseError | unknown) {
    //         throw new Error("Something went wrong", err!);
    //       }
    //     } else {
    //       await updateUser(
    //         user.email,
    //         account?.provider,
    //         account?.access_token
    //       );
    //     }
    //   }
      return true;
    },
    async session({ session }) {
      return session;
    },
    async jwt({ token, account, user }){
      // if (account && user) {
      //   return {
      //     token: account?.access_token,
      //     accessTokenExpires: Date.now() + account?.expires_at! * 10,
      //     refreshToken: account?.refresh_token,
      //     user,
      //   };
      // }
      // Return previous token if the access token has not expired yet

      return token;
    },
  },
};
