import { NextAuthOptions, getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || clientId.length === 0) {
        throw new Error('There is no "clientId" for the Google provider');
    }
    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('There is no "clientSecret" for the Google provider');
    }

    return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                },
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing fields');
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user was found with this email');
                }

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword as string
                );
                if (!passwordsMatch) {
                    throw new Error('Incorrect password');
                }

                return user;
            },
        }),
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
    ],
    callbacks: {
        session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.username = token.username;
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({ where: { email: token.email } });

            if (!dbUser) {
                token.id = user!.id;
                return token;
            }

            if (!dbUser.username) {
                await db.user.update({
                    where: { id: dbUser.id },
                    data: { username: nanoid(10) },
                });
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username,
                role: dbUser.role,
            };
        },
    },
};

export const getAuthSession = () => getServerSession(authOptions);
