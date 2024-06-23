'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { OptionalSchool } from '@/store/useResumeEducationStore';
import { useRouter } from 'next/navigation';
import ViewerResumeContainer from '../ViewerResumeContainer';
import LabelWithDates from '../shared/LabelWithDates';
import LabelWithIcon from '../shared/LabelWithIcon';
import { IconChevronRight } from '@tabler/icons-react';

interface ViewerEducationProps {
	title: string;
	educationList: OptionalSchool[];
	error?: string;
}

const ViewerEducation = ({ title, educationList, error }: ViewerEducationProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<ViewerResumeContainer title={title}>
			{educationList.length > 0 ? (
				<div className='flex flex-col gap-4 mt-2'>
					{educationList.map((school) => (
						<div
							key={school.title}
							className='flex flex-col relative'>
							<LabelWithIcon
								label={school.career}
								icon={
									<IconChevronRight
										id='svg'
										size={16}
										stroke={1}
									/>
								}
							/>
							<LabelWithDates
								label={school.title}
								startDate={school.startDate}
								endDate={school.endDate}
								formatTime={school.formatTime}
							/>
							{!school.descriptionDisabled && <p className='text-xs text-gray-600 pl-6 mt-1'>{school.description}</p>}
						</div>
					))}
				</div>
			) : (
				<p>No education</p>
			)}
		</ViewerResumeContainer>
	);
};

export default ViewerEducation;
