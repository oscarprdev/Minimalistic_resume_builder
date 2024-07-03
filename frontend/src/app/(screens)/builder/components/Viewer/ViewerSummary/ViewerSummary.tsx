'use client';

import { useToastError } from '@/hooks/useRouterError';
import ViewerResumeContainer from '../ViewerResumeContainer';
import { useSearchParams } from 'next/navigation';
import { Resume } from '@/types';
import { useContext, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { SECTION_CONTROL } from '../../_utils/sections';
import { paramsContext } from '@/providers/ParamsProvider';

interface ViewerSummaryProps {
	title: string;
	summary: string;
	error?: string;
	isSectionHidden?: boolean;
	userId?: string;
}

const ViewerSummary = ({ title, summary, error, isSectionHidden, userId }: ViewerSummaryProps) => {
	useToastError(error);

	const { theme } = useContext(paramsContext);

	const isVerticalTheme = useMemo(() => theme === Resume.theme.VERTICAL, [theme]);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer
					title={title}
					kind={SECTION_CONTROL.SUMMARY}
					userId={userId}>
					<div
						id='text-summary'
						className={cn('relative', isVerticalTheme && 'pl-5 ml-[0.65rem]')}>
						{isVerticalTheme && (
							<span
								id='span-summary'
								className='w-[1px] top-0 left-0 bg-gray-300 h-full absolute'></span>
						)}
						<p className={cn('text-sm text-gray-600 text-pretty')}>{summary}</p>
					</div>
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerSummary;
