import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { ListResumeUsecase } from './list_resume.use-case';

export interface ListResumeHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultListResumeHandler implements ListResumeHandler {
	constructor(private readonly usecase: ListResumeUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;

			const resumeList = await this.usecase.execute({ userId });

			return new Response(JSON.stringify(resumeList), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
