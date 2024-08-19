import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, Header } from '../../../../core/domain/types';
import { CreateHeaderUsecase } from './create_header.use_case';
import { z } from 'zod';

export interface CreateHeaderHandler {
	handleRequest(request: RequestParams): Promise<Response>;
}

const HeaderSectionSchema = z.object({
	name: z.string(),
	job: z.string(),
	location: z.string(),
	email: z.string(),
	phone: z.string(),
	links: z.array(z.string().url()),
	image: z.string().optional(),
	isHidden: z.boolean(),
});

type CreateHeaderHandlerActions = 'extractPayload';

export class DefaultCreateHeaderHandler implements CreateHeaderHandler {
	constructor(private readonly usecase: CreateHeaderUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Header;

		const { error } = HeaderSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<CreateHeaderHandlerActions>(
				'Request payload not correct',
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

			const response = { status: 201, message: 'Header created successfully' } satisfies CommonPostResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
