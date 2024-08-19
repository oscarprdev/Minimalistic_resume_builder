import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { ResumeDb } from '../../domain/types';
import {
	DeleteResumeInfrastructureInput,
	ErrorActions,
	ListResumeByUserInfrastructureInput,
	UpdateResumeInfrastructureInput,
} from './types';

export interface GlobalResumeDatabase {
	listResumeByUser(input: ListResumeByUserInfrastructureInput): Promise<ResumeDb[]>;
	updateResume(input: UpdateResumeInfrastructureInput): Promise<void>;
	deleteResume(input: DeleteResumeInfrastructureInput): Promise<void>;
}

export class DefaultGlobalResumeDatabase implements GlobalResumeDatabase {
	constructor(private readonly database: Database) {}

	async listResumeByUser({ ownerId }: ListResumeByUserInfrastructureInput): Promise<ResumeDb[]> {
		try {
			const result = await this.database.query(
				`SELECT * FROM resume WHERE owner = $1 ORDER BY created_at DESC;`,
				[ownerId]
			);

			return result as ResumeDb[];
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'listResumeByUser');
		}
	}

	async updateResume({ resumeId, data: { title, theme, image } }: UpdateResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE resume 
					SET title = $2,
						theme = $3,
						image = $4
					WHERE id = $1;
				`,
				[resumeId, title, theme, image]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateResume');
		}
	}

	async deleteResume({ resumeId }: DeleteResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				DELETE FROM resume WHERE id = $1;
				`,
				[resumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteResume');
		}
	}
}
