import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DescribeExperienceUsecase } from './describe_experience.use_case';

export interface DescribeExperienceHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeExperienceHandler implements DescribeExperienceHandler {
	constructor(private readonly usecase: DescribeExperienceUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const experienceData = await this.usecase.execute({ userId, resumeId });

			return new Response(JSON.stringify(experienceData), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
