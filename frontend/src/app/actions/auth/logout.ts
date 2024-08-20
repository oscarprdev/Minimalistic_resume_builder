'use server';

import { signOut } from '@/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const logoutUser = async () => {
	await signOut();

	cookies().delete('id');

	revalidatePath('/');
};
