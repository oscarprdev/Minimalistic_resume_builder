'use client';

import { useToastError } from '@/hooks/useRouterError';
import { OptionalJob } from '@/store/useResumeExperienceStore';
import ViewerResumeContainer from '../ViewerResumeContainer';
import { IconChevronRight, IconPointFilled } from '@tabler/icons-react';
import LabelWithDates from '../shared/LabelWithDates';
import LabelWithIcon from '../shared/LabelWithIcon';
import { Resume } from '@/types';
import { useContext, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { SECTION_CONTROL } from '../../_utils/sections';
import { paramsContext } from '@/providers/ParamsProvider';

interface ViewerExperienceProps {
	title: string;
	jobList: OptionalJob[];
	error?: string;
	isSectionHidden?: boolean;
	userId?: string;
}

const ViewerExperience = ({ title, jobList, error, isSectionHidden = false, userId }: ViewerExperienceProps) => {
	useToastError(error);

	const { theme } = useContext(paramsContext);

	const isDefaultTheme = useMemo(() => theme === Resume.theme.DEFAULT, [theme]);
	const isVerticalTheme = useMemo(() => theme === Resume.theme.VERTICAL, [theme]);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer
					title={title}
					kind={SECTION_CONTROL.EXPERIENCE}
					userId={userId}>
					{jobList.length > 0 ? (
						<ul className={cn('flex flex-col pt-2', isDefaultTheme && 'gap-4', isVerticalTheme && 'pt-0')}>
							{jobList.map((job) => (
								<li
									key={job.title}
									className={cn('flex flex-col relative', isVerticalTheme && 'pb-5 last-of-type:pb-0')}>
									{isVerticalTheme && (
										<span
											id='line-experience'
											aria-hidden
											className='absolute top-2 left-[11px] w-[1px] h-full bg-gray-300'></span>
									)}
									<LabelWithIcon
										label={job.title}
										icon={
											(isDefaultTheme && (
												<IconChevronRight
													id='svg'
													size={16}
													stroke={1}
												/>
											)) ||
											(isVerticalTheme && (
												<IconPointFilled
													id='svg'
													size={16}
													stroke={1}
													className='text-gray-400'
												/>
											))
										}
									/>
									<LabelWithDates
										label={job.company}
										startDate={job.startDate}
										endDate={job.endDate}
										formatTime={job.formatTime}
									/>

									{!job.descriptionDisabled && <p className='text-xs text-gray-600 pl-6 mt-1'>{job.description}</p>}
								</li>
							))}
						</ul>
					) : (
						<p className='text-xs text-gray-500'>No jobs</p>
					)}
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerExperience;
