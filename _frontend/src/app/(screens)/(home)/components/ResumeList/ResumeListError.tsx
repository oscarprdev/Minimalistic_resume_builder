'use client';

import { useToastError } from '@/hooks/useRouterError';

interface ResumeListErrorProps {
	error: string;
}

const ResumeListError = ({ error }: ResumeListErrorProps) => {
	useToastError(error);

	return <p className='text-sm p-5 text-gray-700 w-[500px] text-center'>No data</p>;
};

export default ResumeListError;
