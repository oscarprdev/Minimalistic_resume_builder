'use client';

import { logoutUser } from '@/app/actions/auth/logout';
import { IconLogout } from '@tabler/icons-react';

const LogoutButton = () => {
	const handleLogout = async () => logoutUser();

	return (
		<button
			className="w-full flex items-center gap-2 relative cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-900 "
			onClick={handleLogout}>
			<IconLogout size={16} />
			<p className="text-xs">Logout</p>
		</button>
	);
};

export default LogoutButton;
