'use client';

import { useToastError } from '@/hooks/useRouterError';
import { strToCapitalized } from '@/lib/utils';
import React from 'react';
import ViewerTitlePagination from './ViewerTitlePagination';

interface ViewerTitleProps {
	resumeTitle: string;
	error?: string;
	allResumesIds?: string[];
	index?: number;
}

const ViewerTitle = ({ resumeTitle, error, allResumesIds, index }: ViewerTitleProps) => {
	useToastError(error);

	return (
		<ViewerTitlePagination
			allResumesIds={allResumesIds}
			index={index}>
			<p className='w-full text-center text-sm text-purple_200'>{strToCapitalized(resumeTitle)}</p>
		</ViewerTitlePagination>
	);
};

export default ViewerTitle;
