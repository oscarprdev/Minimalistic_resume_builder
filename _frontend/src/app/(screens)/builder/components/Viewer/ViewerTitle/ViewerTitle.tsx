'use client';

import { useToastError } from '@/hooks/useRouterError';
import { strToCapitalized } from '@/lib/utils';
import ViewerTitlePagination from './ViewerTitlePagination';
import { Resume } from '@/types';

interface ViewerTitleProps {
	resumeTitle: string;
	error?: string;
	allResumesData?: { id: string; theme: Resume.theme }[];
	index?: number;
	isSectionHidden?: boolean;
}

const ViewerTitle = ({ resumeTitle, error, allResumesData, index, isSectionHidden = false }: ViewerTitleProps) => {
	useToastError(error);

	return (
		<>
			{!isSectionHidden && (
				<ViewerTitlePagination
					allResumesData={allResumesData}
					index={index}>
					<p
						data-testid='viewer-resume-title'
						className='w-full text-center text-sm text-purple_200'>
						{strToCapitalized(resumeTitle)}
					</p>
				</ViewerTitlePagination>
			)}
		</>
	);
};

export default ViewerTitle;
