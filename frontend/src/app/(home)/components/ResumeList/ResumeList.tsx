'use server';

import Link from 'next/link';
import { listResumeAction } from '../../../actions/resume/list-resume.action';
import { getCallback } from '@/lib/service.utils';
import { isLeft } from '@/lib/either';
import { useUserLogged } from '@/hooks/use-user-logged';
import ResumeListError from './ResumeListError';
import ResumeListContainer from './ResumeListContainer';

const ResumeList = async () => {
	const user = await useUserLogged();
	const response = await listResumeAction({
		userId: user?.id || '',
		getCallback,
	});
	if (isLeft(response)) {
		return (
			<ResumeListContainer>
				<ResumeListError error={response.left} />
			</ResumeListContainer>
		);
	}

	return (
		<ResumeListContainer>
			{!isLeft(response) &&
				response.right.map((resume) => (
					<Link
						key={resume.id}
						href={`/builder?resume=${resume.id}`}
						className='hover:bg-gray-100 duration-200 w-full min-w-[500px] text-center first-of-type:border-t-transparent p-4 capitalize border border-transparent border-t-gray-100'>
						{resume.title}
					</Link>
				))}
		</ResumeListContainer>
	);
};

export default ResumeList;
