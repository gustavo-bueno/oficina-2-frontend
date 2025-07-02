import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                senha: credentials?.password,
              }),
            });
  
            if (!res.ok) {
              console.log(res);
              console.log(await res.json());
              throw new Error("Invalid credentials");
            }
  
            const user = await res.json();
  
            console.log(user);
  
            if (user && user.token) {
              return {
                id: user?.id,
                token: user.token,
                admin: user?.admin,
              };
            }
  
            return null;
          } catch (error) {
            console.error("Login error:", error);
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }: { token: JWT; user: any }) {
        if (user) {
          token.token = user.token;
          token.admin = user.admin;
        }
        return token;
      },
      async session({ session, token }: { session: any; token: JWT }) {
        if (session.user) {
          session.user.token = token.token;
          session.user.admin = token.admin;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/auth/login",
    },
  };
  