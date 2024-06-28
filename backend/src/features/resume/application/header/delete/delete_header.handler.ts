import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonDeleteResponse } from '../../../../core/domain/types';
import { DeleteHeaderUsecase } from './delete_header.use_case';

export interface DeleteHeaderHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDeleteHeaderHandler implements DeleteHeaderHandler {
	constructor(private readonly usecase: DeleteHeaderUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			await this.usecase.execute({ userId, resumeId });

			const response = { status: 201, message: 'Header deleted successfully' } satisfies CommonDeleteResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
