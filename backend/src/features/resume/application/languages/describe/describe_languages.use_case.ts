import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Languages } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DescribeLanguagesPorts } from './describe_languages.ports';

interface DescribeLanguagesUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DescribeLanguagesUsecaseAction = 'provideLanguagesId' | 'provideLanguagesData';

export interface DescribeLanguagesUsecase {
	execute(input: DescribeLanguagesUsecaseExecuteInput): Promise<Languages>;
}

export class DefaultDescribeLanguagesUsecase extends DefaultCommonResumeUsecase implements DescribeLanguagesUsecase {
	constructor(private readonly ports: DescribeLanguagesPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideLanguagesId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.languages) {
			return new DefaultErrorEntity().sendError<DescribeLanguagesUsecaseAction>(
				'Languages not stored on a resume',
				404,
				'provideLanguagesId'
			);
		}

		return currentResume.languages;
	}

	private async provideLanguagesData(languagesResumeId: string): Promise<Languages> {
		const languages = await this.ports.getLanguages({ languagesResumeId });

		if (!languages) {
			return new DefaultErrorEntity().sendError<DescribeLanguagesUsecaseAction>('Languages not found', 404, 'provideLanguagesData');
		}

		return languages;
	}

	async execute({ userId, resumeId }: DescribeLanguagesUsecaseExecuteInput): Promise<Languages> {
		const currentUser = await this.validateUser({ userId });
		const languagesResumeId = await this.provideLanguagesId(resumeId, currentUser);

		return await this.provideLanguagesData(languagesResumeId);
	}
}
