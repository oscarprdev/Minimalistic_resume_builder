import { DefaultResume } from './default-resume.types';
import { DEFAULT_IMAGE } from '@/constants';
import { Job, Language, School, Skill } from '@/types';

export const defaultLink = 'http://www.your-url.com';

export const defaultResume: DefaultResume = {
	id: '',
	title: '',
	header: {
		isHidden: false,
		name: 'Your name',
		job: 'Your description',
		location: 'Location',
		email: 'your-email@email.com',
		phone: '000',
		image: DEFAULT_IMAGE,
		links: [defaultLink],
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

export const defaultSchool: Omit<School, 'id'> = {
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
