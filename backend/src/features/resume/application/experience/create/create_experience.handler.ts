import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, Experience } from '../../../../core/domain/types';
import { CreateExperienceUsecase } from './create_experience.use_case';

export interface CreateExperienceHandler {
	handleRequest(request: RequestParams): Promise<Response>;
}

const JobSchema = z.object({
	title: z.string(),
	company: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	description: z.string(),
});

const ExperienceSectionSchema = z.object({
	title: z.string(),
	jobList: z.array(JobSchema),
});

type CreateExperienceHandlerActions = 'extractPayload';

export class DefaultCreateExperienceHandler implements CreateExperienceHandler {
	constructor(private readonly usecase: CreateExperienceUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Experience;

		const { error } = ExperienceSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<CreateExperienceHandlerActions>('Request payload not correct', 400, 'extractPayload');
		}

		return { data: bodyParsed };
	}

	public async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const { data } = await this.extractPayload(request);

			await this.usecase.execute({ userId, resumeId, data });

			const response = { status: 201, message: 'Experience created successfully' } satisfies CommonPostResponse;

			return new Response(response.message, response);
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
