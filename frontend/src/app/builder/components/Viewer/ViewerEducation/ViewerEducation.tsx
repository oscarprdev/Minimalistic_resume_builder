'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { OptionalSchool } from '@/store/useResumeEducationStore';
import { useRouter } from 'next/navigation';

interface ViewerEducationProps {
	title: string;
	educationList: OptionalSchool[];
	error?: string;
}

const ViewerEducation = ({ title, educationList, error }: ViewerEducationProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<section className='p-5'>
			<h3 className='font-bold text-lg'>{title}</h3>
			{educationList.length > 0 ? (
				<div className='flex flex-col gap-4 mt-2'>
					{educationList.map((school) => (
						<div
							key={school.title}
							className='flex flex-col'>
							<div className='w-full flex items-center justify-between'>
								<p>{school.career}</p>
								<div className='flex items-center gap-2'>
									<p className='text-xs text-gray-600'>{school.startDate}</p>
									<p className='text-xs text-gray-600'>{'/'}</p>
									<p className='text-xs text-gray-600'>{school.endDate}</p>
								</div>
							</div>
							<p>{school.title}</p>
							<p className='text-sm text-gray-700'>{school.description}</p>
						</div>
					))}
				</div>
			) : (
				<p>No education</p>
			)}
		</section>
	);
};

export default ViewerEducation;
