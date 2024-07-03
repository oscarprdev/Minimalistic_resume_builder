import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Resume } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';

export interface DescribeResumeUsecaseInput {
	userId: string;
	resumeId: string;
}

export interface DescribeResumeUsecase {
	execute(input: DescribeResumeUsecaseInput): Promise<Resume>;
}

export class DefaultDescribeResumeUsecase extends DefaultCommonResumeUsecase implements DescribeResumeUsecase {
	constructor(readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	async execute({ userId, resumeId }: DescribeResumeUsecaseInput): Promise<Resume> {
		const currentUser = await this.validateUser({ userId });

		const dbResume = await this.validateResume({ userId: currentUser.id, resumeId });
		if (!dbResume) {
			return new DefaultErrorEntity().sendError('Resume not found', 404, 'DefaultDescribeResumeUsecase');
		}

		return {
			id: dbResume.id,
			title: dbResume.title,
			header: Boolean(dbResume.header),
			summary: Boolean(dbResume.summary),
			education: Boolean(dbResume.education),
			experience: Boolean(dbResume.experience),
			languages: Boolean(dbResume.languages),
			skills: Boolean(dbResume.skills),
			theme: dbResume.theme,
			image: dbResume.image,
		};
	}
}
