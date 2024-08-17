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
		title: 'About me',
		summary: 'Something interesting about me',
	},
	experience: {
		isHidden: true,
		title: 'Professional Experience',
		jobList: [],
	},
	education: {
		isHidden: true,
		title: 'Education',
		educationList: [],
	},
	languages: {
		isHidden: true,
		title: 'Languages',
		languageList: [],
	},
	skills: {
		isHidden: true,
		title: 'Skills',
		skillList: [],
	},
};

export const defaultJob: Omit<Job, 'id'> = {
	title: 'Title job',
	company: 'Company',
	description: 'Job description',
	dates: '2011 - 2022',
};

export const defaultEducation: Omit<School, 'id'> = {
	title: 'Title education',
	career: 'Institution',
	dates: '3 years',
};

export const defaultLanguage: Omit<Language, 'id'> = {
	name: 'Spanish',
	level: 'Native',
};

export const defaultSkill: Omit<Skill, 'id'> = {
	name: 'Job hopper',
};
