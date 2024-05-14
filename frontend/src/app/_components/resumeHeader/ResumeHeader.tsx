'use server';

import { describeHeader } from '@/app/actions/resume/sections/header/describe-header';

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
		<div>
			<p>{data?.name}</p>
			<p>{data?.location}</p>
		</div>
	);
};

export default ResumeHeader;
