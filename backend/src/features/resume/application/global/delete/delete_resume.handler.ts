import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DeleteResumeUsecase } from './delete_resume.use-case';
import { CommonDeleteResponse } from '../../../../core/domain/types';

export interface DeleteResumeHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDeleteResumeHandler implements DeleteResumeHandler {
	constructor(private readonly usecase: DeleteResumeUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			await this.usecase.execute({ userId, resumeId });

			const response = { status: 201, message: 'Resume deleted successfully' } satisfies CommonDeleteResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
