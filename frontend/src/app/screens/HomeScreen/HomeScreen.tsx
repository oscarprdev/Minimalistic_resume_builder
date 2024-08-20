'use server';

import { createResumeAction } from '../../actions/resume/create-resume';
import AddResumeSectionModal from '../../components/Modals/AddResumeSectionModal';
import ResumeEducation from '../../components/Resume/ResumeEducation/ResumeEducation';
import ResumeExperience from '../../components/Resume/ResumeExperience/ResumeExperience';
import ResumeHeader from '../../components/Resume/ResumeHeader/ResumeHeader';
import ResumeLanguage from '../../components/Resume/ResumeLanguages/ResumeLanguage';
import ResumeSkills from '../../components/Resume/ResumeSkills/ResumeSkills';
import ResumeSummary from '../../components/Resume/ResumeSummary/ResumeSummary';
import HomeScreenClient from './HomeScreenClient';
import { filterSections } from './utils/utils';
import { updateHeaderAction } from '@/app/actions/resume/update-header';
import ErrorMessage from '@/app/containers/ErrorMessage';
import MainHome from '@/app/containers/MainHome';
import { auth } from '@/auth';
import { defaultResume } from '@/data/default-resume';
import { isError } from '@/lib/types';
import { ResumeService } from '@/services/resume-service';
import { User } from 'next-auth';

type HomeScreenProps = {
	resumeId?: string;
};

export default async function HomeScreen({ resumeId }: HomeScreenProps) {
	const session = await auth();
	const user = session?.user;

	if (!user?.id || !user?.name) return <HomeScreenClient userLogged={user} />;

	const resumeService = new ResumeService({ id: user.id, username: user.name });

	const allResumesResponse = await resumeService.describe();
	if (isError(allResumesResponse)) {
		return (
			<MainHome>
				<ErrorMessage text={allResumesResponse.error} />
			</MainHome>
		);
	}
	if (allResumesResponse.success.length === 0) {
		return <NewResumeScreen user={user} resumeService={resumeService} />;
	}

	const id = resumeId || allResumesResponse.success[0].id;

	const resumeResponseCompleted = await resumeService.describeById(id);
	if (isError(resumeResponseCompleted)) {
		return (
			<MainHome>
				<ErrorMessage text={resumeResponseCompleted.error} />
			</MainHome>
		);
	}

	const { header, summary, experience, education, languages, skills } = resumeResponseCompleted.success;
	let sections = filterSections(summary, experience, education, skills, languages);

	return (
		<MainHome>
			{header && <ResumeHeader userLogged={user} resumeId={id} resumeHeader={header} />}
			{summary && <ResumeSummary userLogged={user} resumeId={id} resumeSummary={summary} />}
			{experience && <ResumeExperience userLogged={user} resumeId={id} resumeExperience={experience} />}
			{education && <ResumeEducation userLogged={user} resumeId={id} resumeEducation={education} />}
			{skills && <ResumeSkills userLogged={user} resumeId={id} resumeSkills={skills} />}
			{languages && <ResumeLanguage userLogged={user} resumeId={id} resumeLanguages={languages} />}
			{sections.filter(Boolean).length < 5 && (
				<AddResumeSectionModal userLogged={user} resumeId={id} sectionsDisplayed={sections} />
			)}
		</MainHome>
	);
}

const NewResumeScreen = async ({ user, resumeService }: { user: User; resumeService: ResumeService }) => {
	const id = crypto.randomUUID().toString();
	const createResumeResponse = await createResumeAction(id);
	if (isError(createResumeResponse)) {
		return (
			<MainHome>
				<ErrorMessage text={createResumeResponse.error} />
			</MainHome>
		);
	}

	const createDefaultHeaderResponse = await updateHeaderAction(
		{ ...defaultResume.header, id: crypto.randomUUID().toString() },
		id
	);
	if (isError(createDefaultHeaderResponse)) {
		return (
			<MainHome>
				<ErrorMessage text={createDefaultHeaderResponse.error} />
			</MainHome>
		);
	}

	const resumeResponseCompleted = await resumeService.describeById(id);
	if (isError(resumeResponseCompleted)) {
		return (
			<MainHome>
				<ErrorMessage text={resumeResponseCompleted.error} />
			</MainHome>
		);
	}
	return (
		<MainHome>
			{resumeResponseCompleted.success.header && (
				<ResumeHeader
					userLogged={user}
					resumeId={createResumeResponse.success}
					resumeHeader={resumeResponseCompleted.success.header}
				/>
			)}
			<AddResumeSectionModal userLogged={user} resumeId={createResumeResponse.success} sectionsDisplayed={[]} />
		</MainHome>
	);
};
