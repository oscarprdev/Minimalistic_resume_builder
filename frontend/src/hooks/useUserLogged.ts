import { auth } from '@/auth';

export const useUserLogged = async () => {
	const session = await auth();

	return session?.user;
};
