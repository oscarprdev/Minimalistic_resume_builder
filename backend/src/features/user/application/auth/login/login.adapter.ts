import { UserDb } from '../../../domain/types';
import { CommonUserDatabase } from '../../../infrastructure/common';
import { DescribeUserByUsernameInput, LoginPorts } from './login.ports';

export class LoginAdapter implements LoginPorts {
	constructor(private readonly userDatabase: CommonUserDatabase) {}

	async describeUserByUsername({ username }: DescribeUserByUsernameInput): Promise<UserDb> {
		return await this.userDatabase.getUserByUsername({ username });
	}
}
