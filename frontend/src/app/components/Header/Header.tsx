'use server';

import DropdownLogged from './DropdownLogged';
import { auth } from '@/auth';
import Link from 'next/link';

const Header = async ({ resumeId }: { resumeId?: string }) => {
	const session = await auth();

	return (
		<header
			id="app-header"
			data-testid="app-header"
			className="relative w-screen flex justify-between py-5 px-24 sm:px-32">
			<div className="group flex flex-col items-start">
				<h1 className="text-sm font-bold">MRB - Minimalistic Resume Builder</h1>
				<span className="flex gap-1 text-xs text-zinc-400 ">
					<p className="group-hover:text-zinc-700 duration-200">by</p>
					<Link
						href="https://github.com/oscarprdev"
						target="blank"
						className="group-hover:text-zinc-900 group-hover:underline  duration-200">
						Oscar Perez
					</Link>
				</span>
			</div>

			<DropdownLogged user={session?.user} resumeId={resumeId} />
		</header>
	);
};

export default Header;
