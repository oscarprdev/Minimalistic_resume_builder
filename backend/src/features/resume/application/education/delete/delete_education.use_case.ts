import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Education } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DeleteEducationPorts } from './delete_education.ports';

interface DeleteEducationUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DeleteEducationUsecaseAction = 'provideEducationId' | 'provideEducationData';

export interface DeleteEducationUsecase {
	execute(input: DeleteEducationUsecaseExecuteInput): Promise<void>;
}

export class DefaultDeleteEducationUsecase extends DefaultCommonResumeUsecase implements DeleteEducationUsecase {
	constructor(private readonly ports: DeleteEducationPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideEducationId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.education) {
			return new DefaultErrorEntity().sendError<DeleteEducationUsecaseAction>(
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
			return new DefaultErrorEntity().sendError<DeleteEducationUsecaseAction>('Education not found', 404, 'provideEducationData');
		}

		return education;
	}

	async execute({ userId, resumeId }: DeleteEducationUsecaseExecuteInput): Promise<void> {
		const currentUser = await this.validateUser({ userId });
		const educationResumeId = await this.provideEducationId(resumeId, currentUser);
		const { id, educationList } = await this.provideEducationData(educationResumeId);

		await this.ports.deleteSchools({ schoolsIds: educationList.map((school) => school.id) });
		await this.ports.deleteEducation({ educationResumeId: id });
		await this.ports.deleteEducationFromResume({ resumeId });
	}
}
