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
import { SectionSelected } from '@/app/components/types/types';
import MainHome from '@/app/containers/MainHome';
import { auth } from '@/auth';
import { isError } from '@/lib/types';
import { ResumeService } from '@/services/resume-service';

export default async function HomeScreen() {
	const session = await auth();
	const user = session?.user;

	if (user?.id && user?.name) {
		const resumeService = new ResumeService({ id: user.id, username: user.name });

		const response = await resumeService.describe();
		if (isError(response)) {
			return (
				<MainHome>
					<p>{response.error}</p>
				</MainHome>
			);
		}

		if (response.success.length === 0) {
			const response = await createResumeAction();
			if (isError(response)) {
				return (
					<MainHome>
						<p>{response.error}</p>
					</MainHome>
				);
			}
			return (
				<MainHome>
					<ResumeHeader userLogged={user} resumeId={response.success} />
					<AddResumeSectionModal userLogged={user} resumeId={response.success} sectionsDisplayed={[]} />
				</MainHome>
			);
		}

		const firstResume = response.success[0];

		let sections = [];

		if (firstResume.summary) {
			sections.push(SectionSelected.summary);
		}

		if (firstResume.experience) {
			sections.push(SectionSelected.experience);
		}

		if (firstResume.education) {
			sections.push(SectionSelected.education);
		}

		if (firstResume.skills) {
			sections.push(SectionSelected.skills);
		}

		if (firstResume.languages) {
			sections.push(SectionSelected.languages);
		}

		return (
			<MainHome>
				{firstResume.header && <ResumeHeader userLogged={user} resumeId={firstResume.id} />}
				{firstResume.summary && <ResumeSummary userLogged={user} resumeId={firstResume.id} />}
				{firstResume.experience && <ResumeExperience userLogged={user} resumeId={firstResume.id} />}
				{firstResume.education && <ResumeEducation userLogged={user} resumeId={firstResume.id} />}
				{firstResume.skills && <ResumeSkills userLogged={user} resumeId={firstResume.id} />}
				{firstResume.languages && <ResumeLanguage userLogged={user} resumeId={firstResume.id} />}
				{sections.length < 5 && (
					<AddResumeSectionModal userLogged={user} resumeId={firstResume.id} sectionsDisplayed={sections} />
				)}
			</MainHome>
		);
	}

	return <HomeScreenClient userLogged={user} />;
}
