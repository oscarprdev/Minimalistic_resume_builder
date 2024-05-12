import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Languages } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DeleteLanguagesPorts } from './delete_languages.ports';

interface DeleteLanguagesUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DeleteLanguagesUsecaseAction = 'provideLanguagesId' | 'provideLanguagesData';

export interface DeleteLanguagesUsecase {
	execute(input: DeleteLanguagesUsecaseExecuteInput): Promise<void>;
}

export class DefaultDeleteLanguagesUsecase extends DefaultCommonResumeUsecase implements DeleteLanguagesUsecase {
	constructor(private readonly ports: DeleteLanguagesPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideLanguagesId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.languages) {
			return new DefaultErrorEntity().sendError<DeleteLanguagesUsecaseAction>(
				'Languages not stored on a resume',
				404,
				'provideLanguagesId'
			);
		}

		return currentResume.languages;
	}

	private async provideLanguagesData(languagesResumeId: string): Promise<Languages> {
		const Languages = await this.ports.getLanguages({ languagesResumeId });

		if (!Languages) {
			return new DefaultErrorEntity().sendError<DeleteLanguagesUsecaseAction>('Languages not found', 404, 'provideLanguagesData');
		}

		return Languages;
	}

	async execute({ userId, resumeId }: DeleteLanguagesUsecaseExecuteInput): Promise<void> {
		const currentUser = await this.validateUser({ userId });
		const languagesResumeId = await this.provideLanguagesId(resumeId, currentUser);
		const { id, languageList } = await this.provideLanguagesData(languagesResumeId);

		await this.ports.deleteLangs({ langIds: languageList.map((lang) => lang.id) });
		await this.ports.deleteLanguages({ languagesResumeId: id });
		await this.ports.deleteLanguagesFromResume({ resumeId });
	}
}
