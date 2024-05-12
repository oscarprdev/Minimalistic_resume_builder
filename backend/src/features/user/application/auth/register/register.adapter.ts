import { UserDb } from '../../../domain/types';
import { CommonUserDatabase } from '../../../infrastructure/common';
import { DescribeUserByUsernameInput, InsertUserInput, RegisterPorts } from './register.ports';

export class RegisterAdapter implements RegisterPorts {
	constructor(private readonly userDatabase: CommonUserDatabase) {}

	async describeUserByUsername({ username }: DescribeUserByUsernameInput): Promise<UserDb> {
		return await this.userDatabase.getUserByUsername({ username });
	}

	async insertUser({ id, username, password }: InsertUserInput): Promise<void> {
		await this.userDatabase.insertUser({ id, username, password });
	}
}
