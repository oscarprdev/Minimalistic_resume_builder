import { DescribeHeaderPorts } from './describe_header.ports';

export interface DescribeHeaderUsecase {
	execute(): Promise<void>;
}

export class DefaultDescribeHeaderUsecase implements DescribeHeaderUsecase {
	constructor(private readonly ports: DescribeHeaderPorts) {}

	async execute() {}
}
