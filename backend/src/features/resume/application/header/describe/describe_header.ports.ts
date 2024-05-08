import { Header } from '../../../../core/domain/types';

export interface DescribeHeaderPorts {
	getHeader(input: GetHeaderPortsInput): Promise<Header | null>;
}

export interface GetHeaderPortsInput {
	headerResumeId: string;
}
