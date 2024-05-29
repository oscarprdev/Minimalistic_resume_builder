'use server';

import { Suspense } from 'react';
import ResumeHeader from '../_components/resume/header/ResumeHeader';
import ResumeSummary from '../_components/resume/summary/ResumeSummary';
import ResumeExperience from '../_components/resume/experience/ResumeExperience';

interface ResumeProps {
	userId?: string;
	resumeId?: string;
}

const Resume = ({ userId, resumeId }: ResumeProps) => {
	return (
		<article className='bg-white w-[800px] min-h-screen p-5 mx-auto shadow-lg'>
			<Suspense fallback={<p>Loading resume section</p>}>
				<ResumeHeader
					userId={userId}
					resumeId={resumeId}
				/>
			</Suspense>
			<Suspense fallback={<p>Loading resume section</p>}>
				<ResumeSummary
					userId={userId}
					resumeId={resumeId}
				/>
			</Suspense>
			<Suspense fallback={<p>Loading resume section</p>}>
				<ResumeExperience
					userId={userId}
					resumeId={resumeId}
				/>
			</Suspense>
		</article>
	);
};

export default Resume;
