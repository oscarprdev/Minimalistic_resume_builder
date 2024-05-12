import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { UpdateResumeUsecase } from './update_resume.use-case';
import { CommonPostResponse, Resume } from '../../../../core/domain/types';

export interface UpdateResumeHandler {
	handleRequest(request: Request): Promise<Response>;
}

const ResumeSectionSchema = z.object({
	title: z.string(),
});

type UpdateResumeHandlerActions = 'extractPayload';

export class DefaultUpdateResumeHandler implements UpdateResumeHandler {
	constructor(private readonly usecase: UpdateResumeUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Resume;

		const { error } = ResumeSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<UpdateResumeHandlerActions>('Request payload not correct', 400, 'extractPayload');
		}

		return { data: bodyParsed };
	}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const { data } = await this.extractPayload(request);

			await this.usecase.execute({ userId, resumeId, data });

			const response = { status: 201, message: 'Resume updated successfully' } satisfies CommonPostResponse;

			return new Response(response.message, response);
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
