import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Resume, ResumeCompleted } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DescribeResumePorts } from './describe_resume.ports';

export interface DescribeResumeUsecaseInput {
	userId: string;
	resumeId: string;
}

export interface DescribeResumeUsecase {
	execute(input: DescribeResumeUsecaseInput): Promise<ResumeCompleted>;
}

export class DefaultDescribeResumeUsecase extends DefaultCommonResumeUsecase implements DescribeResumeUsecase {
	constructor(
		readonly commonPorts: CommonResumePorts,
		private readonly ports: DescribeResumePorts
	) {
		super(commonPorts);
	}

	async execute({ userId, resumeId }: DescribeResumeUsecaseInput): Promise<ResumeCompleted> {
		const currentUser = await this.validateUser({ userId });

		const dbResume = await this.validateResume({ userId: currentUser.id, resumeId });
		if (!dbResume) {
			return new DefaultErrorEntity().sendError('Resume not found', 404, 'DefaultDescribeResumeUsecase');
		}

		const [header, summary, education, experience, languages, skills] = await Promise.all([
			(dbResume.header && this.ports.describeHeader(dbResume.header)) || null,
			(dbResume.summary && this.ports.describeSummary(dbResume.summary)) || null,
			(dbResume.education && this.ports.describeEducation(dbResume.education)) || null,
			(dbResume.experience && this.ports.describeExperience(dbResume.experience)) || null,
			(dbResume.languages && this.ports.describeLanguages(dbResume.languages)) || null,
			(dbResume.skills && this.ports.describeSkills(dbResume.skills)) || null,
		]);

		return {
			id: dbResume.id,
			title: dbResume.title,
			header,
			summary,
			education,
			experience,
			languages,
			skills,
			theme: dbResume.theme,
			image: dbResume.image,
		};
	}
}
