import { describeExperience } from '@/app/actions/resume/sections/experience/describe-experience';
import ResumeExperienceFormController from './ResumeExperienceFormController';

interface ResumeExperienceProps {
	userId?: string;
	resumeId?: string;
}

const ResumeExperience = async ({ userId, resumeId }: ResumeExperienceProps) => {
	const { data, error } = await describeExperience({ userId, resumeId });

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<ResumeExperienceFormController
			userId={userId || ''}
			resumeId={resumeId || ''}
			defaultValues={data}
		/>
	);
};

export default ResumeExperience;
