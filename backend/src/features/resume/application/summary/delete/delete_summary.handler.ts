import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonDeleteResponse } from '../../../../core/domain/types';
import { DeleteSummaryUsecase } from './delete_summary.use_case';

export interface DeleteSummaryHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDeleteSummaryHandler implements DeleteSummaryHandler {
	constructor(private readonly usecase: DeleteSummaryUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			await this.usecase.execute({ userId, resumeId });

			const response = { status: 201, message: 'Summary deleted successfully' } satisfies CommonDeleteResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
