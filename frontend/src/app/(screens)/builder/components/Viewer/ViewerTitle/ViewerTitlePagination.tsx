'use client';

import { isTruthyNumber } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

interface ViewerTitlePaginationProps {
	children: ReactNode;
	allResumesIds?: string[];
	index?: number;
}

const ViewerTitlePagination = ({ children, allResumesIds, index }: ViewerTitlePaginationProps) => {
	const allResumesIdsIsValid = Array.isArray(allResumesIds) && allResumesIds.some((id) => Boolean(id));
	const indexIsValid = typeof index !== 'undefined' && isTruthyNumber(index);
	const queryParams = useSearchParams();

	const previousIndex = useMemo(() => {
		if ((!index && index !== 0) || !allResumesIds) {
			return -1;
		}

		const i = index - 1;
		return i < 0 ? allResumesIds.length - 1 : i;
	}, [index, allResumesIds]);

	const nextIndex = useMemo(() => {
		if ((!index && index !== 0) || !allResumesIds) {
			return -1;
		}

		const i = index + 1;
		return i > allResumesIds.length - 1 ? 0 : i;
	}, [index, allResumesIds]);

	if (!allResumesIdsIsValid || !indexIsValid) {
		return <div className='w-fit flex items-center gap-4'>{children}</div>;
	}

	const sectionSelected = queryParams.get('selected');

	const commonHref = sectionSelected ? `&selected=${sectionSelected}` : '';

	return (
		<div className='w-[650px] flex items-center justify-center gap-4'>
			{previousIndex >= 0 && (
				<Link href={`/builder?resume=${allResumesIds[previousIndex]}${commonHref}`}>
					<IconArrowLeft
						stroke={1}
						size={20}
						className='hover:text-purple_200'
					/>
				</Link>
			)}
			{children}
			{nextIndex >= 0 && (
				<Link href={`/builder?resume=${allResumesIds[nextIndex]}${commonHref}`}>
					<IconArrowRight
						stroke={1}
						size={20}
						className='hover:text-purple_200'
					/>
				</Link>
			)}
		</div>
	);
};

export default ViewerTitlePagination;
