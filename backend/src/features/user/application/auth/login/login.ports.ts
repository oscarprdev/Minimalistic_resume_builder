import { UserDb } from '../../../domain/types';

export interface LoginPorts {
	describeUserByUsername(input: DescribeUserByUsernameInput): Promise<UserDb>;
}

export interface DescribeUserByUsernameInput {
	username: string;
}
