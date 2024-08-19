import { Resume } from '../../../core/domain/types';

export interface ResumeDb {
	id: string;
	owner: string;
	header: string | null;
	summary: string | null;
	education: string | null;
	experience: string | null;
	languages: string | null;
	skills: string | null;
	title: string;
	theme: Resume.theme;
	image: string;
}

export interface HeaderDb {
	id: string;
	name: string;
	job: string;
	location: string;
	email: string;
	phone: string;
	links: Array<string>;
	image: string | null;
	isHidden: boolean;
}

export interface SummaryDb {
	id: string;
	title: string;
	isHidden: boolean;
	summary: string;
}

export interface UserDb {
	id: string;
}

export interface JobDb {
	id: string;
	title: string;
	company: string;
	dates: string;
	description: string;
}

export interface ExperienceDb {
	id: string;
	title: string;
	isHidden: boolean;
	jobList: JobDb[];
}

export interface SchoolDb {
	id: string;
	title: string;
	career: string;
	dates: string;
}

export interface EducationDb {
	id: string;
	title: string;
	isHidden: boolean;
	educationList: SchoolDb[];
}

export interface LanguageDb {
	id: string;
	name: string;
	level: string;
	certificateLink: string | null;
}

export interface LanguagesDb {
	id: string;
	title: string;
	isHidden: boolean;
	languageList: LanguageDb[];
}

export interface SkillDb {
	id: string;
	name: string;
}

export interface SkillsDb {
	id: string;
	title: string;
	isHidden: boolean;
	skillList: SkillDb[];
}
