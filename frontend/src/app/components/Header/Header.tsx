'use server';

import AuthModal from '../Modals/AuthModal';
import DropdownLogged from './DropdownLogged';
import { auth } from '@/auth';
import Link from 'next/link';

const Header = async () => {
	const session = await auth();

	return (
		<header className="w-screen flex justify-between py-5 px-32">
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
			<DropdownLogged username={session?.user?.name || null} />
		</header>
	);
};

export default Header;
