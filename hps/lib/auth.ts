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
        const result = loginValidator.safeParse(credentials);
        if (!result.success) {
          console.log('❌ loginValidator 실패:', result.error);
          return null;
        }

        const { id: loginId, password } = result.data;
        console.log('📨 받은 로그인 정보:', loginId, password);

        const userpass = await getUserPassword(loginId);
        console.log('🔍 userpass 결과:', userpass);
        if (!userpass) {
          console.log('❌ userpass 정보 없음');
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          userpass.password
        );
        console.log('✅ 비밀번호 비교 결과:', isPasswordValid);

        if (!isPasswordValid) {
          console.log('❌ 비밀번호 불일치');
          return null;
        }
        const user = await getUser(loginId);
        console.log('🧍‍♀️ 최종 user 정보:', user);

        if (!user) {
          console.log('❌ user 정보 없음');
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
    async signIn({ user, account }) {
      if (!user) {
        throw new Error('Invalid credentials');
      }
      console.log('🚀 signIn - user:', user, account);
      return true;
    },
    async jwt({ token, user }) {
      console.log('🚀 jwt - token:', token, user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('🚀 cb - session:', session, token);
      if (token) {
        session.user.id = String(token.id);
        session.user.name = token.name;
      }
      return session;
    },
  },
});
