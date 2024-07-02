'use client';

import { isTruthyNumber } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { Resume } from '@/types';

interface ViewerTitlePaginationProps {
	children: ReactNode;
	allResumesData?: { id: string; theme: Resume.theme }[];
	index?: number;
}

const ViewerTitlePagination = ({ children, allResumesData, index }: ViewerTitlePaginationProps) => {
	const allResumesIdsIsValid = Array.isArray(allResumesData) && allResumesData.some((data) => Boolean(data.id));
	const indexIsValid = typeof index !== 'undefined' && isTruthyNumber(index);
	const queryParams = useSearchParams();

	const previousIndex = useMemo(() => {
		if ((!index && index !== 0) || !allResumesData) {
			return -1;
		}

		const i = index - 1;
		return i < 0 ? allResumesData.length - 1 : i;
	}, [index, allResumesData]);

	const nextIndex = useMemo(() => {
		if ((!index && index !== 0) || !allResumesData) {
			return -1;
		}

		const i = index + 1;
		return i > allResumesData.length - 1 ? 0 : i;
	}, [index, allResumesData]);

	if (!allResumesIdsIsValid || !indexIsValid) {
		return <div className='w-fit flex items-center gap-4'>{children}</div>;
	}

	const sectionSelected = queryParams.get('selected');

	const commonHref = sectionSelected ? `&selected=${sectionSelected}` : '';

	return (
		<div className='w-[650px] flex items-center justify-center gap-4'>
			{previousIndex >= 0 && (
				<Link href={`/builder?resume=${allResumesData[previousIndex].id}&theme=${allResumesData[previousIndex].theme}${commonHref}`}>
					<IconArrowLeft
						stroke={1}
						size={20}
						className='hover:text-purple_200'
					/>
				</Link>
			)}
			{children}
			{nextIndex >= 0 && (
				<Link href={`/builder?resume=${allResumesData[nextIndex]}&theme=${allResumesData[previousIndex].theme}${commonHref}`}>
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
