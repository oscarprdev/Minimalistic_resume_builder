'use client';

import { useToastError } from '@/hooks/useRouterError';
import ViewerResumeContainer from '../ViewerResumeContainer';

interface ViewerSummaryProps {
	title: string;
	summary: string;
	error?: string;
	isSectionHidden?: boolean;
}

const ViewerSummary = ({ title, summary, error, isSectionHidden }: ViewerSummaryProps) => {
	useToastError(error);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer title={title}>
					<p className='text-sm text-gray-600 text-pretty'>{summary}</p>
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerSummary;
