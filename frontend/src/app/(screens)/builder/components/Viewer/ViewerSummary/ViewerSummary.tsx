'use client';

import { useRouterError } from '@/hooks/useRouterError';
import { useRouter } from 'next/navigation';
import ViewerResumeContainer from '../ViewerResumeContainer';

interface ViewerSummaryProps {
	title: string;
	summary: string;
	error?: string;
}

const ViewerSummary = ({ title, summary, error }: ViewerSummaryProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<ViewerResumeContainer title={title}>
			<p className='text-sm text-gray-600 text-pretty'>{summary}</p>
		</ViewerResumeContainer>
	);
};

export default ViewerSummary;
