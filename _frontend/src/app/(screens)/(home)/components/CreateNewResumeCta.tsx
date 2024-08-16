'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import Link from 'next/link';

const CreateNewResumeCta = async () => {
	const user = await useUserLogged();
	return (
		<Link
			href={`${user ? '/builder?selected=info' : '/builder'}`}
			className='h-9 px-10 py-4 bg-purple_200 text-slate-50 shadow hover:bg-purple_100 duration-300 inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50'>
			Create new resume
		</Link>
	);
};

export default CreateNewResumeCta;
