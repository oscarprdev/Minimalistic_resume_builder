import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DescribeEducationUsecase } from './describe_education.use_case';

export interface DescribeEducationHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeEducationHandler implements DescribeEducationHandler {
	constructor(private readonly usecase: DescribeEducationUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const educationData = await this.usecase.execute({ userId, resumeId });

			return new Response(JSON.stringify(educationData), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
