import { Education, Experience, Header, Languages, Skills, Summary } from '@/types';

export type DefaultResumeHeader = Omit<Header, 'id'>;
export type DefaultResumeSummary = Omit<Summary, 'id'>;
export type DefaultResumeExperience = Omit<Experience, 'id'>;
export type DefaultResumeEducation = Omit<Education, 'id'>;
export type DefaultResumeSkills = Omit<Skills, 'id'>;
export type DefaultResumeLanguages = Omit<Languages, 'id'>;

export type DefaultResume = {
	id: string;
	title: string;
	header: DefaultResumeHeader;
	summary: DefaultResumeSummary;
	experience: DefaultResumeExperience;
	education: DefaultResumeEducation;
	skills: DefaultResumeSkills;
	languages: DefaultResumeLanguages;
};
