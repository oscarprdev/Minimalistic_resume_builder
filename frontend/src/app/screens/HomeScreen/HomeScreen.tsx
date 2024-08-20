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
import { updateHeaderAction } from '@/app/actions/resume/update-header';
import { SectionSelected } from '@/app/components/types/types';
import ErrorMessage from '@/app/containers/ErrorMessage';
import MainHome from '@/app/containers/MainHome';
import { auth } from '@/auth';
import { defaultResume } from '@/data/default-resume';
import { isError } from '@/lib/types';
import { ResumeService } from '@/services/resume-service';
import { Resume } from '@/types';

type HomeScreenProps = {
	resumeId?: string;
};

export default async function HomeScreen({ resumeId }: HomeScreenProps) {
	const session = await auth();
	const user = session?.user;

	if (user?.id && user?.name) {
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

			return (
				<MainHome>
					<ResumeHeader userLogged={user} resumeId={createResumeResponse.success} />
					<AddResumeSectionModal
						userLogged={user}
						resumeId={createResumeResponse.success}
						sectionsDisplayed={[]}
					/>
				</MainHome>
			);
		}

		let resumeFetched: Resume;

		if (resumeId) {
			const resumeByIdResponse = await resumeService.describeById(resumeId);
			if (isError(resumeByIdResponse)) {
				return (
					<MainHome>
						<ErrorMessage text={resumeByIdResponse.error} />
					</MainHome>
				);
			}

			resumeFetched = resumeByIdResponse.success;
		} else {
			resumeFetched = allResumesResponse.success[0];
		}

		let sections = [];

		if (resumeFetched.summary) {
			sections.push(SectionSelected.summary);
		}

		if (resumeFetched.experience) {
			sections.push(SectionSelected.experience);
		}

		if (resumeFetched.education) {
			sections.push(SectionSelected.education);
		}

		if (resumeFetched.skills) {
			sections.push(SectionSelected.skills);
		}

		if (resumeFetched.languages) {
			sections.push(SectionSelected.languages);
		}

		return (
			<MainHome>
				{/* <ResumeHeader userLogged={user} resumeId={resumeFetched.id} />
				{resumeFetched.summary && <ResumeSummary userLogged={user} resumeId={resumeFetched.id} />} */}
				{resumeFetched.experience && <ResumeExperience userLogged={user} resumeId={resumeFetched.id} />}
				{resumeFetched.education && <ResumeEducation userLogged={user} resumeId={resumeFetched.id} />}
				{/* {resumeFetched.skills && <ResumeSkills userLogged={user} resumeId={resumeFetched.id} />}
				{resumeFetched.languages && <ResumeLanguage userLogged={user} resumeId={resumeFetched.id} />}
				{sections.length < 5 && (
					<AddResumeSectionModal userLogged={user} resumeId={resumeFetched.id} sectionsDisplayed={sections} />
				)} */}
			</MainHome>
		);
	}

	return <HomeScreenClient userLogged={user} />;
}
