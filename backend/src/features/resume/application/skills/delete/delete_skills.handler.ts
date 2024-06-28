import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonDeleteResponse, CommonPostResponse } from '../../../../core/domain/types';
import { DeleteSkillsUsecase } from './delete_skills.use_case';

export interface DeleteSkillsHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDeleteSkillsHandler implements DeleteSkillsHandler {
	constructor(private readonly usecase: DeleteSkillsUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			await this.usecase.execute({ userId, resumeId });

			const response = { status: 201, message: 'Skills deleted successfully' } satisfies CommonDeleteResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
