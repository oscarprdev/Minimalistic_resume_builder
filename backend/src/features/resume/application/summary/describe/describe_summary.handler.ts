import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DescribeSummaryUsecase } from './describe_summary.use_case';

export interface DescribeSummaryHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeSummaryHandler implements DescribeSummaryHandler {
	constructor(private readonly usecase: DescribeSummaryUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const summaryData = await this.usecase.execute({ userId, resumeId });

			return new Response(JSON.stringify(summaryData), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
