import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonDeleteResponse, CommonPostResponse } from '../../../../core/domain/types';
import { DeleteLanguagesUsecase } from './delete_languages.use_case';

export interface DeleteLanguagesHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDeleteLanguagesHandler implements DeleteLanguagesHandler {
	constructor(private readonly usecase: DeleteLanguagesUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			await this.usecase.execute({ userId, resumeId });

			const response = { status: 201, message: 'Languages deleted successfully' } satisfies CommonDeleteResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
