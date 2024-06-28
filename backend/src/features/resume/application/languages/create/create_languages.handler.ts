import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, Languages } from '../../../../core/domain/types';
import { CreateLanguagesUsecase } from './create_languages.use-case';

export interface CreateLanguagesHandler {
	handleRequest(request: RequestParams): Promise<Response>;
}

const LangSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string(),
	level: z.string(),
	certificateLink: z
		.string()
		.refine((value) => value === '' || /^[a-zA-Z]+:\/\//.test(value))
		.optional(),
});

const LanguagesSectionSchema = z.object({
	title: z.string(),
	isHidden: z.boolean(),
	languageList: z.array(LangSchema),
});

type CreateLanguagesHandlerActions = 'extractPayload';

export class DefaultCreateLanguagesHandler implements CreateLanguagesHandler {
	constructor(private readonly usecase: CreateLanguagesUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as Languages;

		const { error } = LanguagesSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<CreateLanguagesHandlerActions>(
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

			const response = { status: 201, message: 'Languages created successfully' } satisfies CommonPostResponse;

			return new Response(JSON.stringify(response.message), {
				status: response.status,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
