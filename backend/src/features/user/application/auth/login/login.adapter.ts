import { CommonUserDatabase } from '../../../infrastructure/common';

export class LoginAdapter {
	constructor(private readonly userDatabase: CommonUserDatabase) {}
}
