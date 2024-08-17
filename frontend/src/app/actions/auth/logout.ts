'use server';

import { signOut } from '@/auth';
import { revalidatePath } from 'next/cache';

export const logoutUser = async () => {
	await signOut();

	revalidatePath('/');
};
