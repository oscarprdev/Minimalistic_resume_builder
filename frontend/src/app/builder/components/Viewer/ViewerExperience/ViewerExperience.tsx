'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { OptionalJob } from '@/store/useResumeExperienceStore';
import { useRouter } from 'next/navigation';
import ViewerResumeContainer from '../ViewerResumeContainer';
import { IconChevronRight } from '@tabler/icons-react';
import LabelWithDates from '../shared/LabelWithDates';
import LabelWithIcon from '../shared/LabelWithIcon';

interface ViewerExperienceProps {
	title: string;
	jobList: OptionalJob[];
	error?: string;
}

const ViewerExperience = ({ title, jobList, error }: ViewerExperienceProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<ViewerResumeContainer title={title}>
			{jobList.length > 0 ? (
				<div className='flex flex-col gap-4 mt-2'>
					{jobList.map((job) => (
						<div
							key={job.title}
							className='flex flex-col relative'>
							<LabelWithIcon
								label={job.title}
								icon={
									<IconChevronRight
										id='svg'
										size={16}
										stroke={1}
									/>
								}
							/>
							<LabelWithDates
								label={job.company}
								startDate={job.startDate}
								endDate={job.endDate}
								formatTime={job.formatTime}
							/>

							{!job.descriptionDisabled && <p className='text-xs text-gray-600 pl-6 mt-1'>{job.description}</p>}
						</div>
					))}
				</div>
			) : (
				<p>0 jobs</p>
			)}
		</ViewerResumeContainer>
	);
};

export default ViewerExperience;
