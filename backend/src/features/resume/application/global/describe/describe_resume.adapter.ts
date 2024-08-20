import { Education, Experience, Header, Languages, Skills, Summary } from '../../../../core/domain/types';
import { EducationResumeDatabase } from '../../../infrastructure/education';
import { ExperienceResumeDatabase } from '../../../infrastructure/experience';
import { HeaderResumeDatabase } from '../../../infrastructure/header';
import { LanguagesResumeDatabase } from '../../../infrastructure/languages';
import { SkillsResumeDatabase } from '../../../infrastructure/skills';
import { SummaryResumeDatabase } from '../../../infrastructure/summary';
import { DescribeResumePorts } from './describe_resume.ports';

export class DescribeResumeAdapter implements DescribeResumePorts {
	constructor(
		private readonly headerDatabase: HeaderResumeDatabase,
		private readonly summaryDatabase: SummaryResumeDatabase,
		private readonly experienceDatabase: ExperienceResumeDatabase,
		private readonly educationDatabase: EducationResumeDatabase,
		private readonly skillsDatabase: SkillsResumeDatabase,
		private readonly languagesDatabase: LanguagesResumeDatabase
	) {}

	async describeHeader(id: string): Promise<Header | null> {
		const headerDb = await this.headerDatabase.getHeader({ headerResumeId: id });

		if (!headerDb) return null;

		return {
			id: headerDb.id,
			name: headerDb.name,
			job: headerDb.job,
			location: headerDb.location,
			email: headerDb.email,
			phone: headerDb.phone,
			links: headerDb.links,
			isHidden: headerDb.isHidden,
			...(headerDb.image ? { image: headerDb.image } : {}),
		};
	}

	async describeSummary(id: string): Promise<Summary | null> {
		const summaryDb = await this.summaryDatabase.getSummary({ summaryResumeId: id });

		if (!summaryDb) return null;

		return {
			id: summaryDb.id,
			title: summaryDb.title,
			isHidden: summaryDb.isHidden,
			summary: summaryDb.summary,
		};
	}

	async describeExperience(id: string): Promise<Experience | null> {
		const experienceDb = await this.experienceDatabase.getExperience({ experienceResumeId: id });

		if (!experienceDb) return null;

		return {
			id: experienceDb.id,
			title: experienceDb.title,
			isHidden: experienceDb.isHidden,
			jobList: experienceDb.jobList.every(job => !job.id) ? [] : experienceDb.jobList,
		};
	}

	async describeEducation(id: string): Promise<Education | null> {
		const educationDb = await this.educationDatabase.getEducation({ educationResumeId: id });

		if (!educationDb) return null;

		return {
			id: educationDb.id,
			title: educationDb.title,
			isHidden: educationDb.isHidden,
			educationList: educationDb.educationList.every(school => !school.id) ? [] : educationDb.educationList,
		};
	}

	async describeSkills(id: string): Promise<Skills | null> {
		const skillsDb = await this.skillsDatabase.getSkills({ skillsResumeId: id });

		if (!skillsDb) return null;

		return {
			id: skillsDb.id,
			title: skillsDb.title,
			isHidden: skillsDb.isHidden,
			skillList: skillsDb.skillList.every(skill => !skill.id) ? [] : skillsDb.skillList,
		};
	}

	async describeLanguages(id: string): Promise<Languages | null> {
		const languagesDb = await this.languagesDatabase.getLanguages({ languagesResumeId: id });

		if (!languagesDb) return null;

		return {
			id: languagesDb.id,
			title: languagesDb.title,
			isHidden: languagesDb.isHidden,
			languageList: languagesDb.languageList.every(lang => !lang.id)
				? []
				: languagesDb.languageList.map(lang => ({
						id: lang.id,
						name: lang.name,
						level: lang.level,
						...(lang.certificateLink ? { certificateLink: lang.certificateLink } : {}),
					})),
		};
	}
}
