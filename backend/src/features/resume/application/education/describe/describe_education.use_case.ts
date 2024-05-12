import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Education } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DescribeEducationPorts } from './describe_education.ports';

interface DescribeEducationUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DescribeEducationUsecaseAction = 'provideEducationId' | 'provideEducationData';

export interface DescribeEducationUsecase {
	execute(input: DescribeEducationUsecaseExecuteInput): Promise<Education>;
}

export class DefaultDescribeEducationUsecase extends DefaultCommonResumeUsecase implements DescribeEducationUsecase {
	constructor(private readonly ports: DescribeEducationPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideEducationId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.education) {
			return new DefaultErrorEntity().sendError<DescribeEducationUsecaseAction>(
				'Education not stored on a resume',
				404,
				'provideEducationId'
			);
		}

		return currentResume.education;
	}

	private async provideEducationData(educationResumeId: string): Promise<Education> {
		const education = await this.ports.getEducation({ educationResumeId });

		if (!education) {
			return new DefaultErrorEntity().sendError<DescribeEducationUsecaseAction>('Education not found', 404, 'provideEducationData');
		}

		return education;
	}

	async execute({ userId, resumeId }: DescribeEducationUsecaseExecuteInput): Promise<Education> {
		const currentUser = await this.validateUser({ userId });
		const educationResumeId = await this.provideEducationId(resumeId, currentUser);

		return await this.provideEducationData(educationResumeId);
	}
}
