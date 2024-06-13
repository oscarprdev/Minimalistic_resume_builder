'use server';

import { useUserLogged } from '@/hooks/use-user-logged';
import { ReactNode } from 'react';

export const WithAuthorization = async ({ children }: { children: ReactNode }) => {
	const user = await useUserLogged();

	return user && <>{children}</>;
};
