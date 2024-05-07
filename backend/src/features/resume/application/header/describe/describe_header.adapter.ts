import { HeaderResumeDatabase } from '../../../infrastructure/header';
import { DescribeHeaderPorts } from './describe_header.ports';

export class DescribeHeaderAdapter implements DescribeHeaderPorts {
	constructor(database: HeaderResumeDatabase) {}
}
