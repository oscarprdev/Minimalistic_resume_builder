'use client';

import { isTruthyNumber } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode, useContext, useMemo } from 'react';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { Resume } from '@/types';
import { paramsContext } from '@/providers/ParamsProvider';

interface ViewerTitlePaginationProps {
	children: ReactNode;
	allResumesData?: { id: string; theme: Resume.theme }[];
	index?: number;
}

const ViewerTitlePagination = ({ children, allResumesData, index }: ViewerTitlePaginationProps) => {
	const { selected } = useContext(paramsContext);

	const commonHref = selected ? `&selected=${selected}` : '';
	const allResumesIdsIsValid = Array.isArray(allResumesData) && allResumesData.some((data) => Boolean(data.id));
	const indexIsValid = typeof index !== 'undefined' && isTruthyNumber(index);

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

	return (
		<div className='w-[650px] flex items-center justify-center gap-4'>
			{allResumesData.length > 1 && previousIndex >= 0 && (
				<Link href={`/builder?resume=${allResumesData[previousIndex].id}&theme=${allResumesData[previousIndex].theme}${commonHref}`}>
					<IconArrowLeft
						stroke={1}
						size={20}
						className='hover:text-purple_200'
					/>
				</Link>
			)}
			{children}
			{allResumesData.length > 1 && nextIndex >= 0 && (
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
