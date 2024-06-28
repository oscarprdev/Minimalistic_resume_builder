import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, Summary } from '../../../../core/domain/types';
import { CreateSummaryUsecase } from './create_summary.use_case';

export interface CreateSummaryHandler {
	handleRequest(request: RequestParams): Promise<Response>;
}

const SummarySectionSchema = z.object({
	title: z.string(),
	summary: z.string(),
	isHidden: z.boolean(),
});

type CreateSummaryHandlerActions = 'extractPayload';

export class DefaultCreateSummaryHandler implements CreateSummaryHandler {
	constructor(private readonly usecase: CreateSummaryUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Summary;

		const { error } = SummarySectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<CreateSummaryHandlerActions>('Request payload not correct', 400, 'extractPayload');
		}

		return { data: bodyParsed };
	}

	public async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const { data } = await this.extractPayload(request);

			await this.usecase.execute({ userId, resumeId, data });

			const response = { status: 201, message: 'Summary created successfully' } satisfies CommonPostResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
