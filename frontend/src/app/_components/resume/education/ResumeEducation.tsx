import { describeEducation } from '@/app/actions/resume/sections/education/describe-education';
import ResumeEducationFormController from './ResumeEducationFormController';

interface ResumeEducationProps {
	userId?: string;
	resumeId?: string;
}

const ResumeEducation = async ({ userId, resumeId }: ResumeEducationProps) => {
	const { data, error } = await describeEducation({ userId, resumeId });

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<ResumeEducationFormController
			userId={userId || ''}
			resumeId={resumeId || ''}
			defaultValues={data}
		/>
	);
};

export default ResumeEducation;
