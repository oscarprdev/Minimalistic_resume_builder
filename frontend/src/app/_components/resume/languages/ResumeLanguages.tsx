import { describeLanguages } from '@/app/actions/resume/sections/languages/describe-languages';
import ResumeLanguagesFormController from './ResumeLanguagesFormController';

interface ResumeLanguagesProps {
	userId?: string;
	resumeId?: string;
}

const ResumeLanguages = async ({ userId, resumeId }: ResumeLanguagesProps) => {
	const { data, error } = await describeLanguages({ userId, resumeId });

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<ResumeLanguagesFormController
			userId={userId || ''}
			resumeId={resumeId || ''}
			defaultValues={data}
		/>
	);
};

export default ResumeLanguages;
