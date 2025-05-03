import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            const res = await axios.post("http://backend:5000/api/auth/login", {
              username: credentials?.username,
              password: credentials?.password,
            });
  
            const user = res.data;
            if (user && user.token) {
                return {
                  id: user.userId,
                  name: user.username,
                  token: user.token,
                };
            }
  
            return null;
          } catch (err) {
            console.error("Login failed:", err);
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id as number;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }