import NextAuth, { User } from 'next-auth';
import authConfig from './auth.config';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async session({ session, token }) {
			if (token && token.sub) {
				const user = {
					id: token.sub,
				};

				return { ...session, user };
			}

			return session;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});
