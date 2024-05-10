import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DescribeSkillsUsecase } from './describe_skills.use_case';

export interface DescribeSkillsHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeSkillsHandler implements DescribeSkillsHandler {
	constructor(private readonly usecase: DescribeSkillsUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const skillsData = await this.usecase.execute({ userId, resumeId });

			return new Response(JSON.stringify(skillsData), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
