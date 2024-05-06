import { ResumeDatabase } from '../../infrastructure';
import { DescribeHeaderAdapter } from './describe/describe_header.adapter';
import { DefaultDescribeHeaderUsecase } from './describe/describe_header.use_case';

export class HeaderUsecase {
	constructor(private readonly database: ResumeDatabase) {}

	describeHeader() {
		const describeHeaderAdapter = new DescribeHeaderAdapter(this.database);

		return new DefaultDescribeHeaderUsecase(describeHeaderAdapter);
	}
}
