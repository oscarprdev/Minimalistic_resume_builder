import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DescribeLanguagesUsecase } from './describe_languages.use_case';

export interface DescribeLanguagesHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeLanguagesHandler implements DescribeLanguagesHandler {
	constructor(private readonly usecase: DescribeLanguagesUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const languagesData = await this.usecase.execute({ userId, resumeId });

			return new Response(JSON.stringify(languagesData), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
