import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.error('No user found with the email:', credentials.email);
            throw new Error('Email not registered');
          }

          const isValidPassword = await compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.error('Invalid password for user:', credentials.email);
            throw new Error('Wrong password');
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw new Error(error.message || 'Internal server error');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});