import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credential from 'next-auth/providers/credentials';
import { getUser, getUserPassword } from './actions/auth-actions';
import { loginValidator } from './validator';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    Credential({
      name: 'Id & Password',
      credentials: {
        id: { label: '아이디', type: 'text' },
        password: { label: '패스워드', type: 'password' },
      },
      async authorize(credentials) {
        const result = await loginValidator.safeParseAsync(credentials);
        if (!result.success) {
          return null;
        }

        const data = result.data;
        if (!data) {
          return null;
        }
        const { id: loginId, password } = data;

        const userpass = await getUserPassword(loginId);

        if (!userpass) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          userpass.password
        );

        if (!isPasswordValid) {
          return null;
        }
        const user = await getUser(loginId);

        if (!user) {
          return null;
        }

        const { id, name } = user;

        return {
          id: String(id),
          name,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },

  callbacks: {
    async signIn({ user }) {
      if (!user) {
        throw new Error('Invalid credentials');
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = String(token.id);
        session.user.name = token.name;
      }
      return session;
    },
  },
});
