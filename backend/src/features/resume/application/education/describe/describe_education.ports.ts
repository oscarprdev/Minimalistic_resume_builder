import { Education } from '../../../../core/domain/types';

export interface DescribeEducationPorts {
	getEducation(input: GetEducationPortsInput): Promise<Education | null>;
}

export interface GetEducationPortsInput {
	educationResumeId: string;
}
