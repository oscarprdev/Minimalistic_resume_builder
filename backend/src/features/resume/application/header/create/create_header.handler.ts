import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { Header } from '../../../../core/domain/types';
import { CreateHeaderUsecase } from './create_header.use_case';

export interface CreateHeaderHandler {
	handleRequest(request: RequestParams): Promise<Response>;
}

const HeaderSectionSchema = z.object({
	name: z.string(),
	job: z.string(),
	location: z.string(),
	email: z.string().email(),
	phone: z.string(),
	links: z.array(z.string()),
	image: z.string().optional(),
});

export class DefaultCreateHeaderHandler implements CreateHeaderHandler {
	constructor(private readonly usecase: CreateHeaderUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Header;

		const { error } = HeaderSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError('Request payload not correct', 400);
		}

		return { data: bodyParsed };
	}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const { data } = await this.extractPayload(request);

			await this.usecase.execute({ userId, resumeId, data });

			return new Response('Header created successfully', {
				status: 201,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
