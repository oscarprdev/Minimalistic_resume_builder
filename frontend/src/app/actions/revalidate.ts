'use server';

import { RedirectType, redirect } from 'next/navigation';

export const revalidateAction = (id: string) => {
	redirect(`/?id=${id}`, RedirectType.replace);
};
