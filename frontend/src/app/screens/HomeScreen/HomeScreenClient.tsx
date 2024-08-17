'use client';

import AddResumeSectionModal, { SectionSelected } from '@/app/components/Modals/AddResumeSectionModal';
import ResumeEducation from '@/app/components/Resume/ResumeEducation/ResumeEducation';
import ResumeExperience from '@/app/components/Resume/ResumeExperience/ResumeExperience';
import ResumeHeader from '@/app/components/Resume/ResumeHeader/ResumeHeader';
import ResumeLanguage from '@/app/components/Resume/ResumeLanguages/ResumeLanguage';
import ResumeSkills from '@/app/components/Resume/ResumeSkills/ResumeSkills';
import ResumeSummary from '@/app/components/Resume/ResumeSummary/ResumeSummary';
import MainHome from '@/app/containers/MainHome';
import { defaultResume } from '@/data/default-resume';
import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { useResumeLanguageStore } from '@/store/useResumeLanguageStore';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import { User } from 'next-auth';

type HomeScreenClientProps = {
	userLogged?: User;
};

const HomeScreenClient = ({ userLogged }: HomeScreenClientProps) => {
	const { resumeSummary } = useResumeSummaryStore();
	const { resumeExperience } = useResumeExperienceStore();
	const { resumeEducation } = useResumeEducationStore();
	const { resumeSkills } = useResumeSkillsStore();
	const { resumeLanguage } = useResumeLanguageStore();

	let sections = [];

	if (!resumeSummary.isHidden) {
		sections.push(SectionSelected.summary);
	}

	if (!resumeExperience.isHidden) {
		sections.push(SectionSelected.experience);
	}

	if (!resumeEducation.isHidden) {
		sections.push(SectionSelected.education);
	}

	if (!resumeSkills.isHidden) {
		sections.push(SectionSelected.skills);
	}

	if (!resumeLanguage.isHidden) {
		sections.push(SectionSelected.languages);
	}

	return (
		<MainHome>
			<ResumeHeader userLogged={userLogged} resumeId={defaultResume.id} />
			{!resumeSummary.isHidden && <ResumeSummary userLogged={userLogged} resumeId={defaultResume.id} />}
			{!resumeExperience.isHidden && <ResumeExperience userLogged={userLogged} resumeId={defaultResume.id} />}
			{!resumeEducation.isHidden && <ResumeEducation userLogged={userLogged} resumeId={defaultResume.id} />}
			{!resumeSkills.isHidden && <ResumeSkills userLogged={userLogged} resumeId={defaultResume.id} />}
			{!resumeLanguage.isHidden && <ResumeLanguage userLogged={userLogged} resumeId={defaultResume.id} />}
			{sections.length < 5 && (
				<AddResumeSectionModal
					userLogged={userLogged}
					resumeId={defaultResume.id}
					sectionsDisplayed={sections}
				/>
			)}
		</MainHome>
	);
};

export default HomeScreenClient;
