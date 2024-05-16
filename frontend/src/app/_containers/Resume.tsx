'use server';

import { Suspense } from 'react';
import ResumeHeader from '../_components/resumeHeader/ResumeHeader';

interface ResumeProps {
	userId?: string;
	resumeId?: string;
}

const Resume = ({ userId, resumeId }: ResumeProps) => {
	return (
		<article className='bg-white w-[800px] min-h-screen py-10 px-20 mx-auto shadow-lg'>
			<Suspense fallback={<p>Loading resume section</p>}>
				<ResumeHeader
					userId={userId}
					resumeId={resumeId}
				/>
			</Suspense>
		</article>
	);
};

export default Resume;
