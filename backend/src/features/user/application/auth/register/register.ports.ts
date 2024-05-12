import { UserDb } from '../../../domain/types';

export interface RegisterPorts {
	describeUserByUsername(input: DescribeUserByUsernameInput): Promise<UserDb>;

	insertUser(input: InsertUserInput): Promise<void>;
}

export interface DescribeUserByUsernameInput {
	username: string;
}

export interface InsertUserInput {
	id: string;
	username: string;
	password: string;
}
