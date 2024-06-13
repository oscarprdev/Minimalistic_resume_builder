import { auth } from '@/auth';

export const useUserLogged = async () => {
	const session = await auth();
	console.log(session);
	return session?.user;
};
