'use server';

import { describeHeader } from '@/app/actions/resume/sections/header/describe-header';
import ResumeHeaderFormController from './ResumeHeaderFormController';

interface ResumeHeaderProps {
	userId: string;
	resumeId: string;
}

const ResumeHeader = async ({ userId, resumeId }: ResumeHeaderProps) => {
	const { data, error } = await describeHeader({ userId, resumeId });

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<ResumeHeaderFormController
			userId={userId}
			resumeId={resumeId}
			defaultValues={data}
		/>
	);
};

export default ResumeHeader;
