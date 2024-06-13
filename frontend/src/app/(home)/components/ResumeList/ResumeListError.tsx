'use client';

import { useRouter } from 'next/navigation';

interface ResumeListErrorProps {
	error: string;
}

const ResumeListError = ({ error }: ResumeListErrorProps) => {
	const router = useRouter();

	if (error) {
		router.push(`/?error=${error}`);
	}

	return <p className='text-sm p-5 text-gray-700 w-[500px] text-center'>No data</p>;
};

export default ResumeListError;
