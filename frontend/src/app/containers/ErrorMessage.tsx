'use client';

import { Button } from '../components/ui/button';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type ErrorMessageProps = {
	text: string;
};

const ErrorMessage = ({ text }: ErrorMessageProps) => {
	const router = useRouter();

	return (
		<div className="w-full grid place-items-center gap-2 text-zinc-500">
			<IconAlertTriangle size={16} />
			<p className="text-sm ">{text}</p>
			<Button size={'sm'} onClick={() => router.push('/')}>
				Home
			</Button>
		</div>
	);
};

export default ErrorMessage;
