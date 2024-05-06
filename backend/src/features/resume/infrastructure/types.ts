import { Header } from '../../core/domain/types';

export interface CreateHeaderInfrastructureInput {
	userId: string;
	resumeId: string;
	data: Header;
}

export interface GetResumeInfrastructureInput {
	resumeId: string;
}
