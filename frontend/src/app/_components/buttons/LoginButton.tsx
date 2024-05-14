'use client';

import { usePathname, useRouter } from 'next/navigation';

const LoginButton = () => {
	const pathname = usePathname();
	const router = useRouter();

	const onLoginClick = () => router.push(`${pathname}?user=5560497d-5b31-4e02-9e55-2e7723c34dc3`);

	return <button onClick={onLoginClick}>Login</button>;
};

export default LoginButton;
