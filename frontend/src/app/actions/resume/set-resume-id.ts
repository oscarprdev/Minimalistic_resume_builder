'use server';

import { cookies } from 'next/headers';

export const setResumeId = (id: string) => {
	cookies().set('id', id);
};
