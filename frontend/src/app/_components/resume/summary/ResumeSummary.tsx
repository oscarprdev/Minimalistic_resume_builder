import { describeSummary } from '@/app/actions/resume/sections/summary/describe-summary';
import ResumeSummaryFormController from './ResumeSummaryFormController';

interface ResumeSummaryProps {
	userId?: string;
	resumeId?: string;
}

const ResumeSummary = async ({ userId, resumeId }: ResumeSummaryProps) => {
	const { data, error } = await describeSummary({ userId, resumeId });

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<ResumeSummaryFormController
			userId={userId || ''}
			resumeId={resumeId || ''}
			defaultValues={data}
		/>
	);
};

export default ResumeSummary;
