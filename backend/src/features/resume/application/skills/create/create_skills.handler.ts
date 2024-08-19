import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, Skills } from '../../../../core/domain/types';
import { CreateSkillsUsecase } from './create_skills.use-case';

export interface CreateSkillsHandler {
	handleRequest(request: RequestParams): Promise<Response>;
}

const SkillSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string(),
});

const SkillsSectionSchema = z.object({
	title: z.string(),
	isHidden: z.boolean(),
	skillList: z.array(SkillSchema),
});

type CreateSkillsHandlerActions = 'extractPayload';

export class DefaultCreateSkillsHandler implements CreateSkillsHandler {
	constructor(private readonly usecase: CreateSkillsUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Skills;

		const { error } = SkillsSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<CreateSkillsHandlerActions>(new Error('Request payload not correct'), 400, 'extractPayload');
		}

		return { data: bodyParsed };
	}

	public async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const { data } = await this.extractPayload(request);

			await this.usecase.execute({ userId, resumeId, data });

			const response = { status: 201, message: 'Skills created successfully' } satisfies CommonPostResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
