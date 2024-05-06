import { DescribeHeaderPorts } from './describe_header.ports';

export interface DescribeHeaderUsecase {}

export class DefaultDescribeHeaderUsecase implements DescribeHeaderUsecase {
	constructor(private readonly ports: DescribeHeaderPorts) {}

	handleRequest(request: Request) {
		return new Response('get resume q', {
			status: 200,
		});
	}
}
