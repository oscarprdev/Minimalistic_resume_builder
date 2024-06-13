'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { useRouter } from 'next/navigation';

interface ResumeListErrorProps {
	error: string;
}

const ResumeListError = ({ error }: ResumeListErrorProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return <p className='text-sm p-5 text-gray-700 w-[500px] text-center'>No data</p>;
};

export default ResumeListError;
