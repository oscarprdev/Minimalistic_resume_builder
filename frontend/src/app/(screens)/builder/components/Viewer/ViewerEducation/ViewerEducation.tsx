'use client';

import { useToastError } from '@/hooks/useRouterError';
import { OptionalSchool } from '@/store/useResumeEducationStore';
import ViewerResumeContainer from '../ViewerResumeContainer';
import LabelWithDates from '../shared/LabelWithDates';
import LabelWithIcon from '../shared/LabelWithIcon';
import { IconChevronRight } from '@tabler/icons-react';
import { Resume } from '@/types';
import { useContext, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { SECTION_CONTROL } from '../../_utils/sections';
import { paramsContext } from '@/providers/ParamsProvider';

interface ViewerEducationProps {
	title: string;
	educationList: OptionalSchool[];
	isSectionHidden?: boolean;
	error?: string;
	userId?: string;
}

const ViewerEducation = ({ title, educationList, isSectionHidden = false, error, userId }: ViewerEducationProps) => {
	useToastError(error);
	const { theme } = useContext(paramsContext);

	const isDefaultTheme = useMemo(() => theme === Resume.theme.DEFAULT, [theme]);
	const isVerticalTheme = useMemo(() => theme === Resume.theme.VERTICAL, [theme]);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer
					title={title}
					isAside={isVerticalTheme}
					kind={SECTION_CONTROL.EDUCATION}
					userId={userId}>
					{educationList.length > 0 ? (
						<ul className='flex flex-col gap-4 mt-2'>
							{educationList.map((school) => (
								<li
									key={school.title}
									className={cn('flex flex-col relative', isVerticalTheme && 'items-center text-center')}>
									<LabelWithIcon
										label={school.career}
										isAside={isVerticalTheme}
										icon={
											isDefaultTheme && (
												<IconChevronRight
													id='svg'
													size={16}
													stroke={1}
												/>
											)
										}
									/>
									<LabelWithDates
										label={school.title}
										startDate={school.startDate}
										endDate={school.endDate}
										formatTime={school.formatTime}
										isAside={isVerticalTheme}
									/>
									{!school.descriptionDisabled && <p className='text-xs text-gray-600 pl-6 mt-1'>{school.description}</p>}
								</li>
							))}
						</ul>
					) : (
						<p className='text-xs text-gray-500'>No education</p>
					)}
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerEducation;
