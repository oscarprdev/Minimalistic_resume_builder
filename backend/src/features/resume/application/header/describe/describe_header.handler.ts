import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { DescribeHeaderUsecase } from './describe_header.use_case';

export interface DescribeHeaderHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeHeaderHandler implements DescribeHeaderHandler {
	constructor(private readonly usecase: DescribeHeaderUsecase) {}

	async handleRequest(request: RequestParams) {
		try {
			const userId = request.params.userId;
			const resumeId = request.params.resumeId;

			const headerData = await this.usecase.execute({ userId, resumeId });

			return new Response(JSON.stringify(headerData), {
				status: 200,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
