'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { useRouter } from 'next/navigation';

interface ViewerSummaryProps {
	title: string;
	summary: string;
	error?: string;
}

const ViewerSummary = ({ title, summary, error }: ViewerSummaryProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<section className='p-5'>
			<h3 className='font-bold text-lg'>{title}</h3>
			<p className='text-sm text-gray-700 text-pretty'>{summary}</p>
		</section>
	);
};

export default ViewerSummary;
