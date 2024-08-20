'use client';

import { filterSections } from './utils/utils';
import AddResumeSectionModal from '@/app/components/Modals/AddResumeSectionModal';
import ResumeEducation from '@/app/components/Resume/ResumeEducation/ResumeEducation';
import ResumeExperience from '@/app/components/Resume/ResumeExperience/ResumeExperience';
import ResumeHeader from '@/app/components/Resume/ResumeHeader/ResumeHeader';
import ResumeLanguage from '@/app/components/Resume/ResumeLanguages/ResumeLanguage';
import ResumeSkills from '@/app/components/Resume/ResumeSkills/ResumeSkills';
import ResumeSummary from '@/app/components/Resume/ResumeSummary/ResumeSummary';
import { SectionSelected } from '@/app/components/types/types';
import MainHome from '@/app/containers/MainHome';
import { defaultResume } from '@/data/default-resume';
import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { useResumeHeaderStore } from '@/store/useResumeHeaderStore';
import { useResumeLanguageStore } from '@/store/useResumeLanguageStore';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';
import { User } from 'next-auth';

type HomeScreenClientProps = {
	userLogged?: User;
};

const HomeScreenClient = ({ userLogged }: HomeScreenClientProps) => {
	const { resumeHeader } = useResumeHeaderStore();
	const { resumeSummary } = useResumeSummaryStore();
	const { resumeExperience } = useResumeExperienceStore();
	const { resumeEducation } = useResumeEducationStore();
	const { resumeSkills } = useResumeSkillsStore();
	const { resumeLanguage } = useResumeLanguageStore();

	let sections = filterSections(resumeSummary, resumeExperience, resumeEducation, resumeSkills, resumeLanguage);

	const id = defaultResume.id;

	return (
		<MainHome>
			<ResumeHeader userLogged={userLogged} resumeId={id} resumeHeader={resumeHeader} />
			{!resumeSummary.isHidden && (
				<ResumeSummary userLogged={userLogged} resumeId={id} resumeSummary={resumeSummary} />
			)}
			{!resumeExperience.isHidden && (
				<ResumeExperience userLogged={userLogged} resumeId={id} resumeExperience={resumeExperience} />
			)}
			{!resumeEducation.isHidden && (
				<ResumeEducation userLogged={userLogged} resumeId={id} resumeEducation={resumeEducation} />
			)}
			{!resumeSkills.isHidden && (
				<ResumeSkills userLogged={userLogged} resumeId={id} resumeSkills={resumeSkills} />
			)}
			{!resumeLanguage.isHidden && (
				<ResumeLanguage userLogged={userLogged} resumeId={id} resumeLanguages={resumeLanguage} />
			)}
			{sections.length < 5 && (
				<AddResumeSectionModal userLogged={userLogged} resumeId={id} sectionsDisplayed={sections} />
			)}
		</MainHome>
	);
};

export default HomeScreenClient;
