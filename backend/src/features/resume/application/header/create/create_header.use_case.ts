import { Header } from '../../../../core/domain/types';
import { CreateHeaderPorts } from './create_header.ports';

interface CreateHeaderUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Header;
}

export interface CreateHeaderUsecase {
	execute(input: CreateHeaderUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateHeaderUsecase implements CreateHeaderUsecase {
	constructor(private readonly ports: CreateHeaderPorts) {}

	async execute({ userId, resumeId, data }: CreateHeaderUsecaseExecuteInput) {
		const currentResume = await this.ports.getResume({ resumeId });
		console.log(currentResume);

		await this.ports.createHeader({ userId, resumeId, data });
	}
}
