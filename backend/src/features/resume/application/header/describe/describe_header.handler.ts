import { DescribeHeaderUsecase } from './describe_header.use_case';

export interface DescribeHeaderHandler {
	handleRequest(request: Request): Promise<Response>;
}

export class DefaultDescribeHeaderHandler implements DescribeHeaderHandler {
	constructor(private readonly usecase: DescribeHeaderUsecase) {}

	async handleRequest(request: Request) {
		// usecase

		return new Response('get resume q', {
			status: 200,
		});
	}
}
