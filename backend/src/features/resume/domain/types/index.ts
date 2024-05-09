export interface ResumeDb {
	id: string;
	owner: string;
	header: string | null;
	summary: string | null;
	education: string | null;
	experience: string | null;
	languages: string | null;
	skills: string | null;
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
}

export interface SummaryDb {
	id: string;
	title: string;
	summary: string;
}

export interface UserDb {
	id: string;
}

export interface JobDb {
	id: string;
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
}

export interface ExperienceDb {
	id: string;
	title: string;
	jobList: JobDb[];
}
