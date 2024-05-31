import { describeSkills } from '@/app/actions/resume/sections/skills/describe-skills';
import ResumeSkillsFormController from './ResumeSkillsFormController';

interface ResumeSkillsProps {
	userId?: string;
	resumeId?: string;
}

const ResumeSkills = async ({ userId, resumeId }: ResumeSkillsProps) => {
	const { data, error } = await describeSkills({ userId, resumeId });

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<ResumeSkillsFormController
			userId={userId || ''}
			resumeId={resumeId || ''}
			defaultValues={data}
		/>
	);
};

export default ResumeSkills;
