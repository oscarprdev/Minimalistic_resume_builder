'use server';

import { Suspense } from 'react';
import ResumeHeader from '../_components/resumeHeader/ResumeHeader';

interface ResumeProps {
	userId: string;
	resumeId?: string;
}

const Resume = ({ userId, resumeId }: ResumeProps) => {
	return (
		<div>
			{!resumeId ? (
				'No resume selected'
			) : (
				<Suspense fallback={<p>Loading resume section</p>}>
					<ResumeHeader
						userId={userId}
						resumeId={resumeId}
					/>
				</Suspense>
			)}
		</div>
	);
};

export default Resume;
