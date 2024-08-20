import { SectionSelected } from '@/app/components/types/types';
import { ResumeEducationDefaultValues } from '@/store/useResumeEducationStore';
import { ResumeExperienceDefaultValues } from '@/store/useResumeExperienceStore';
import { ResumeLanguageDefaultValues } from '@/store/useResumeLanguageStore';
import { ResumeSkillsDefaultValues } from '@/store/useResumeSkillsStore';
import { ResumeSummaryDefaultValues } from '@/store/useResumeSummaryStore';

export const filterSections = (
	summary: ResumeSummaryDefaultValues | null,
	experience: ResumeExperienceDefaultValues | null,
	education: ResumeEducationDefaultValues | null,
	skills: ResumeSkillsDefaultValues | null,
	languages: ResumeLanguageDefaultValues | null
) => {
	let sections = [];
	if (summary && !summary.isHidden) {
		sections.push(SectionSelected.summary);
	}

	if (experience && !experience.isHidden) {
		sections.push(SectionSelected.experience);
	}

	if (education && !education.isHidden) {
		sections.push(SectionSelected.education);
	}

	if (skills && !skills.isHidden) {
		sections.push(SectionSelected.skills);
	}

	if (languages && !languages.isHidden) {
		sections.push(SectionSelected.languages);
	}

	return sections;
};
