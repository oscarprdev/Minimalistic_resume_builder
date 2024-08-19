'use server';

import { auth } from '@/auth';

export const userAuth = async () => {
	const session = await auth();
	if (!session?.user || !session.user.id || !session.user.name) {
		throw new Error('User not authorized');
	}

	return {
		id: session.user.id,
		username: session.user.name,
	};
};
