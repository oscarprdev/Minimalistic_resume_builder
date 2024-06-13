import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DescribeResumeUsecase } from './describe_resume.use-case';

export interface DescribeResumeHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeResumeHandler implements DescribeResumeHandler {
	constructor(private readonly usecase: DescribeResumeUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const resumeDescribe = await this.usecase.execute({ userId, resumeId });

			return new Response(JSON.stringify(resumeDescribe), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
