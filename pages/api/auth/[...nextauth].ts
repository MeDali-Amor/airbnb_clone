import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials");
                }
                const comparedPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                if (!comparedPassword) {
                    throw new Error("Invalid credentials");
                }
                return user;
            },
        }),
    ],

    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
