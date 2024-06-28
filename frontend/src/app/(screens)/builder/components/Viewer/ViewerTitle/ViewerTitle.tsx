'use client';

import { useToastError } from '@/hooks/useRouterError';
import { strToCapitalized } from '@/lib/utils';
import ViewerTitlePagination from './ViewerTitlePagination';

interface ViewerTitleProps {
	resumeTitle: string;
	error?: string;
	allResumesIds?: string[];
	index?: number;
	isSectionHidden?: boolean;
}

const ViewerTitle = ({ resumeTitle, error, allResumesIds, index, isSectionHidden = false }: ViewerTitleProps) => {
	useToastError(error);

	return (
		<>
			{!isSectionHidden && (
				<ViewerTitlePagination
					allResumesIds={allResumesIds}
					index={index}>
					<p className='w-full text-center text-sm text-purple_200'>{strToCapitalized(resumeTitle)}</p>
				</ViewerTitlePagination>
			)}
		</>
	);
};

export default ViewerTitle;
