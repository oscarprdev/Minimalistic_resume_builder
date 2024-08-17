import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, Education } from '../../../../core/domain/types';
import { CreateEducationUsecase } from './create_education.use_case';

export interface CreateEducationHandler {
	handleRequest(request: RequestParams): Promise<Response>;
}

const SchoolSchema = z.object({
	id: z.string().uuid().optional(),
	title: z.string(),
	career: z.string(),
	dates: z.string(),
});

const EducationSectionSchema = z.object({
	title: z.string(),
	isHidden: z.boolean(),
	educationList: z.array(SchoolSchema),
});

type CreateEducationHandlerActions = 'extractPayload';

export class DefaultCreateEducationHandler implements CreateEducationHandler {
	constructor(private readonly usecase: CreateEducationUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Education;

		const { error } = EducationSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<CreateEducationHandlerActions>(
				new Error('Request payload not correct'),
				400,
				'extractPayload'
			);
		}

		return { data: bodyParsed };
	}

	public async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const { data } = await this.extractPayload(request);

			await this.usecase.execute({ userId, resumeId, data });

			const response = { status: 201, message: 'Education created successfully' } satisfies CommonPostResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
