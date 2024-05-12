import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Header } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DeleteHeaderPorts } from './delete_header.ports';

interface DeleteHeaderUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DeleteHeaderUsecaseAction = 'provideHeaderId' | 'provideHeaderData';

export interface DeleteHeaderUsecase {
	execute(input: DeleteHeaderUsecaseExecuteInput): Promise<void>;
}

export class DefaultDeleteHeaderUsecase extends DefaultCommonResumeUsecase implements DeleteHeaderUsecase {
	constructor(private readonly ports: DeleteHeaderPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideHeaderId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.header) {
			return new DefaultErrorEntity().sendError<DeleteHeaderUsecaseAction>('Header not stored on a resume', 404, 'provideHeaderId');
		}

		return currentResume.header;
	}

	private async provideHeaderData(headerResumeId: string): Promise<Header> {
		const Header = await this.ports.getHeader({ headerResumeId });

		if (!Header) {
			return new DefaultErrorEntity().sendError<DeleteHeaderUsecaseAction>('Header not found', 404, 'provideHeaderData');
		}

		return Header;
	}

	async execute({ userId, resumeId }: DeleteHeaderUsecaseExecuteInput): Promise<void> {
		const currentUser = await this.validateUser({ userId });
		const headerResumeId = await this.provideHeaderId(resumeId, currentUser);
		const { id } = await this.provideHeaderData(headerResumeId);

		await this.ports.deleteHeader({ headerResumeId: id });
		await this.ports.deleteHeaderFromResume({ resumeId });
	}
}
