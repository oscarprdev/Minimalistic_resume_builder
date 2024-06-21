'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { OptionalJob } from '@/store/useResumeExperienceStore';
import { useRouter } from 'next/navigation';
import ViewerResumeContainer from '../ViewerResumeContainer';

interface ViewerExperienceProps {
	title: string;
	jobList: OptionalJob[];
	error?: string;
}

const ViewerExperience = ({ title, jobList, error }: ViewerExperienceProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<ViewerResumeContainer>
			<h3 className='font-bold text-lg'>{title}</h3>
			{jobList.length > 0 ? (
				<div className='flex flex-col gap-4 mt-2'>
					{jobList.map((job) => (
						<div
							key={job.title}
							className='flex flex-col'>
							<div className='w-full flex items-center justify-between'>
								<p>{job.company}</p>
								<div className='flex items-center gap-2'>
									<p className='text-xs text-gray-600'>{job.startDate}</p>
									<p className='text-xs text-gray-600'>{'/'}</p>
									<p className='text-xs text-gray-600'>{job.endDate}</p>
								</div>
							</div>
							<p>{job.title}</p>
							<p className='text-sm text-gray-700'>{job.description}</p>
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
