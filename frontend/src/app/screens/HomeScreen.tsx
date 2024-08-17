'use server';

import { createResumeAction } from '../actions/resume/create-resume';
import ResumeEducation from '../components/Resume/ResumeEducation/ResumeEducation';
import ResumeExperience from '../components/Resume/ResumeExperience/ResumeExperience';
import ResumeHeader from '../components/Resume/ResumeHeader/ResumeHeader';
import ResumeLanguage from '../components/Resume/ResumeLanguages/ResumeLanguage';
import ResumeSkills from '../components/Resume/ResumeSkills/ResumeSkills';
import ResumeSummary from '../components/Resume/ResumeSummary/ResumeSummary';
import { auth } from '@/auth';
import { defaultResume } from '@/data/default-resume';
import { isError } from '@/lib/types';
import { ResumeService } from '@/services/resume-service';
import { ReactNode } from 'react';

const MainHome = ({ children }: { children: ReactNode }) => <main className="w-screen p-16 m-auto">{children}</main>;

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
					<ResumeSummary userLogged={user} resumeId={response.success} />
					<ResumeExperience userLogged={user} resumeId={response.success} />
					<ResumeEducation userLogged={user} resumeId={response.success} />
					<ResumeSkills userLogged={user} resumeId={response.success} />
					<ResumeLanguage userLogged={user} resumeId={response.success} />
				</MainHome>
			);
		}

		const firstResume = response.success[0];

		return (
			<MainHome>
				{firstResume.header && <ResumeHeader userLogged={user} resumeId={firstResume.id} />}
				{firstResume.summary && <ResumeSummary userLogged={user} resumeId={firstResume.id} />}
				{firstResume.experience && <ResumeExperience userLogged={user} resumeId={firstResume.id} />}
				{firstResume.education && <ResumeEducation userLogged={user} resumeId={firstResume.id} />}
				{firstResume.skills && <ResumeSkills userLogged={user} resumeId={firstResume.id} />}
				{firstResume.languages && <ResumeLanguage userLogged={user} resumeId={firstResume.id} />}
			</MainHome>
		);
	}

	return (
		<MainHome>
			<ResumeHeader userLogged={user} resumeId={defaultResume.id} />
			<ResumeSummary userLogged={user} resumeId={defaultResume.id} />
			<ResumeExperience userLogged={user} resumeId={defaultResume.id} />
			<ResumeEducation userLogged={user} resumeId={defaultResume.id} />
			<ResumeSkills userLogged={user} resumeId={defaultResume.id} />
			<ResumeLanguage userLogged={user} resumeId={defaultResume.id} />
		</MainHome>
	);
}
