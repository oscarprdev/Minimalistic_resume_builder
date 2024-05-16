'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const AuthButton = () => {
	const pathname = usePathname();
	const router = useRouter();
	const params = useSearchParams();

	const isUserLogged = params.get('user');

	const onAuthClick = () => (isUserLogged ? router.push('/') : router.push(`${pathname}?user=5560497d-5b31-4e02-9e55-2e7723c34dc3`));

	return (
		<Button
			variant={isUserLogged ? 'outline' : 'default'}
			onClick={onAuthClick}>
			{isUserLogged ? 'Logout' : 'Login'}
		</Button>
	);
};

export default AuthButton;
