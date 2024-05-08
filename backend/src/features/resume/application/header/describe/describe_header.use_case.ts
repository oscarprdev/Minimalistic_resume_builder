import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Header } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DescribeHeaderPorts } from './describe_header.ports';

interface DescribeHeaderUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DescribeHeaderUsecaseAction = 'provideHeaderId' | 'provideHeaderData';

export interface DescribeHeaderUsecase {
	execute(input: DescribeHeaderUsecaseExecuteInput): Promise<Header>;
}

export class DefaultDescribeHeaderUsecase extends DefaultCommonResumeUsecase implements DescribeHeaderUsecase {
	constructor(private readonly ports: DescribeHeaderPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideHeaderId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.header) {
			return new DefaultErrorEntity().sendError<DescribeHeaderUsecaseAction>('Header not stored on a resume', 404, 'provideHeaderId');
		}

		return currentResume.header;
	}

	private async provideHeaderData(headerResumeId: string): Promise<Header> {
		const header = await this.ports.getHeader({ headerResumeId });

		if (!header) {
			return new DefaultErrorEntity().sendError<DescribeHeaderUsecaseAction>('Header not found', 404, 'provideHeaderData');
		}

		return header;
	}

	async execute({ userId, resumeId }: DescribeHeaderUsecaseExecuteInput): Promise<Header> {
		const currentUser = await this.validateUser({ userId });
		const headerResumeId = await this.provideHeaderId(resumeId, currentUser);

		return await this.provideHeaderData(headerResumeId);
	}
}
