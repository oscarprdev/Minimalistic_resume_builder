import { ResumeDatabase } from '../../../infrastructure';
import { DescribeHeaderPorts } from './describe_header.ports';

export class DescribeHeaderAdapter implements DescribeHeaderPorts {
	constructor(database: ResumeDatabase) {}
}
