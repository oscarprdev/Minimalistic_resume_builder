import { Education, Experience, Header, Languages, Skills, Summary } from '../../../../core/domain/types';

export interface DescribeResumePorts {
	describeHeader(id: string): Promise<Header | null>;
	describeSummary(id: string): Promise<Summary | null>;
	describeExperience(id: string): Promise<Experience | null>;
	describeEducation(id: string): Promise<Education | null>;
	describeSkills(id: string): Promise<Skills | null>;
	describeLanguages(id: string): Promise<Languages | null>;
}
