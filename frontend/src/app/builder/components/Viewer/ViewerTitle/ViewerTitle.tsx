'use client';

import { useRouterError } from '@/hooks/useRouterError';
import { strToCapitalized } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import ViewerTitlePagination from './ViewerTitlePagination';

interface ViewerTitleProps {
	resumeTitle: string;
	error?: string;
	allResumesIds?: string[];
	index?: number;
}

const ViewerTitle = ({ resumeTitle, error, allResumesIds, index }: ViewerTitleProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<ViewerTitlePagination
			allResumesIds={allResumesIds}
			index={index}>
			<p className='text-sm text-purple_200'>{strToCapitalized(resumeTitle)}</p>
		</ViewerTitlePagination>
	);
};

export default ViewerTitle;
