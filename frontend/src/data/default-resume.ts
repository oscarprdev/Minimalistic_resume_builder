import { DefaultResume } from './default-resume.types';
import { Job, Language, School, Skill } from '@/types';

export const defaultResume: DefaultResume = {
	id: '',
	title: '',
	header: {
		isHidden: false,
		name: '',
		job: '',
		location: '',
		email: '',
		phone: '',
		links: [],
	},
	summary: {
		isHidden: true,
		title: '',
		summary: '',
	},
	experience: {
		isHidden: true,
		title: '',
		jobList: [],
	},
	education: {
		isHidden: true,
		title: '',
		educationList: [],
	},
	languages: {
		isHidden: true,
		title: '',
		languageList: [],
	},
	skills: {
		isHidden: true,
		title: '',
		skillList: [],
	},
};

export const defaultJob: Omit<Job, 'id'> = {
	title: '',
	company: '',
	description: '',
	descriptionDisabled: false,
	formatTime: '',
	startDate: '',
	endDate: '',
};

export const defaultEducation: Omit<School, 'id'> = {
	title: '',
	description: '',
	career: '',
	descriptionDisabled: false,
	formatTime: '',
	startDate: '',
	endDate: '',
};

export const defaultLanguage: Omit<Language, 'id'> = {
	name: '',
	level: '',
};

export const defaultSkill: Omit<Skill, 'id'> = {
	name: '',
	svgUrl: '',
};
