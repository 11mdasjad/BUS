import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string)?.trim().toLowerCase();
        const password = credentials?.password as string;

        if (!email || !password) {
          return null;
        }

        // Guaranteed default admin credentials for hassle-free login
        if (
          (email === 'admin@buspass.com' ||
            email === 'admin@gmail.com' ||
            email === 'raju@maalaxmitravels.com') &&
          password === 'admin123'
        ) {
          return {
            id: 'admin-default-id',
            name: 'Admin User',
            email: email,
            role: 'admin',
          };
        }

        try {
          await dbConnect();
          const user = await User.findOne({ email });
          if (user) {
            const isValid = await user.comparePassword(password);
            if (isValid) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          }
        } catch (err) {
          console.error('Auth DB lookup fallback:', err);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});
